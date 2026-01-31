'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, ThreeEvent } from '@react-three/fiber';
import * as THREE from 'three';
import { TextureLoader } from 'three';
import { OrbitControls } from '@react-three/drei';
import { FlashLogo } from './Text';
interface ImageItem {
  src: string;
  position: [number, number, number];
  rotation: [number, number, number];
  size: number;
  url?: string; // 添加可选的跳转链接
}

// 加载状态组件
function LoadingSpinner() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-gray-300 border-t-white rounded-full animate-spin"></div>
        <div className="mt-4 text-white text-center">
          <div className="text-lg font-semibold">Loading...</div>
        </div>
      </div>
    </div>
  );
}

// 错误处理组件
function ErrorFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black">
      <div className="text-center text-white">
        <div className="text-2xl mb-2">⚠️</div>
        <div className="text-lg font-semibold mb-2">加载失败</div>
        <div className="text-sm text-gray-400">请刷新页面重试</div>
      </div>
    </div>
  );
}

// 图片加载错误边界
class ImageErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}

function DirectImages({
  images,
  textures = [],
  mouseY = 0,
  onImageClick,
}: {
  images?: ImageItem[];
  textures?: THREE.Texture[];
  mouseY?: number;
  onImageClick?: (url: string) => void;
}) {
  // 预加载图片
  React.useEffect(() => {
    if (!images) return;
    
    const loadImages = async () => {
      const imageUrls = images.map(img => img.src);
      const textures: THREE.Texture[] = [];

      for (let i = 0; i < imageUrls.length; i++) {
        try {
          const texture = await new Promise<THREE.Texture>((resolve, reject) => {
            const loader = new TextureLoader();
            loader.load(
              imageUrls[i],
              (texture) => {
                // 设置纹理参数
                texture.wrapS = THREE.ClampToEdgeWrapping;
                texture.wrapT = THREE.ClampToEdgeWrapping;
                texture.flipY = true;
                resolve(texture);
              },
              undefined,
              reject
            );
          });
          
          textures[i] = texture;
        } catch (error) {
          console.error(`Failed to load image: ${imageUrls[i]}`, error);
        }
      }
    };

    loadImages();
  }, [images]);

  // 为每个图片创建平滑下降动画
  function SmoothImage({
    img,
    texture,
    onImageClick,
  }: {
    img: ImageItem;
    texture: THREE.Texture | null; // 允许 null
    onImageClick?: (url: string) => void;
  }) {
    const meshRef = useRef<THREE.Mesh>(null);
    const originalY = (img.position as [number, number, number])[1];
    const originalX = (img.position as [number, number, number])[0];
    const currentYRef = useRef(originalY);
    const [isHovered, setIsHovered] = useState(false);

    // 计算原始宽高比
    const aspect =
      texture?.image && texture.image.width && texture.image.height
        ? texture.image.height / texture.image.width
        : 1;

    useFrame(() => {
      if (meshRef.current && texture) {
        // 计算目标Y位置
        const targetYOffset = mouseY > 0 && originalY > 0 ? -mouseY * 0.2 : 0;
        const targetY = originalY + targetYOffset;
        
        const shrinkFactor = 0.45;
        const targetX =
          window.innerWidth < 640 ? originalX * (1 - shrinkFactor) : originalX;

        // 平滑插值
        currentYRef.current += (targetY - currentYRef.current) * 0.03;
        // 更新 mesh 位置
        meshRef.current.position.set(
          window.innerWidth < 640 ? targetX : originalX,
          currentYRef.current,
          (img.position as [number, number, number])[2]
        );
        // 更新mesh位置
        meshRef.current.position.y = currentYRef.current;
      }
    });

    // 点击事件处理
    const handleClick = (event: ThreeEvent<MouseEvent>) => {
      event.stopPropagation();
      console.log('图片被点击了！', img.src, '→', img.url); // 调试信息
      if (img.url && onImageClick) {
        console.log('准备跳转到:', img.url); // 调试信息
        onImageClick(img.url);
      }
    };

    // 添加鼠标按下事件作为备用
    const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
      event.stopPropagation();
      console.log('图片被按下！', img.url); // 调试信息
      if (img.url && onImageClick) {
        console.log('准备跳转到:', img.url); // 调试信息
        onImageClick(img.url);
      }
    };

    // 鼠标悬停事件处理
    const handlePointerOver = (event: ThreeEvent<PointerEvent>) => {
      event.stopPropagation();
      setIsHovered(true);
      document.body.style.cursor = 'pointer';
    };

    const handlePointerOut = (event: ThreeEvent<PointerEvent>) => {
      event.stopPropagation();
      setIsHovered(false);
      document.body.style.cursor = 'default';
    };
    
    if (!texture) return null; // 没有纹理时不渲染
    
    return (
      <mesh
        ref={meshRef}
        position={[
          originalX,
          originalY,
          (img.position as [number, number, number])[2]
        ]}
        rotation={[
          (img.rotation as [number, number, number])[0],
          (img.rotation as [number, number, number])[1],
          (img.rotation as [number, number, number])[2]
        ]}
        onClick={handleClick}
        onPointerDown={handlePointerDown}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        scale={isHovered ? 1.1 : 1}
      >
        <planeGeometry args={[img.size, img.size * aspect]} />
        <meshBasicMaterial 
          map={texture} 
          side={THREE.DoubleSide}
          opacity={isHovered ? 0.8 : 1}
          transparent={true}
        />
      </mesh>
    );
  }

  return (
    <>
      {images?.map((img, i) =>
        textures[i] ? (
          <SmoothImage key={i} img={img} texture={textures[i]} onImageClick={onImageClick} />
        ) : null
      )}
    </>
  );
}

const Banner = () => {
  const [targetPosition, setTargetPosition] = useState<[number, number, number]>([0, 0, 0]);
  const [position, setPosition] = useState<[number, number, number]>([0, 0, 0]);
  const [mouseY, setMouseY] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const positionRef = useRef<[number, number, number]>([0, 0, 0]);
  const orbitControlsRef = useRef<import('three-stdlib').OrbitControls | null>(null);
  const [targetAzimuth, setTargetAzimuth] = useState(0);
  const [targetPolar, setTargetPolar] = useState(Math.PI / 2);
  const [currentAzimuth, setCurrentAzimuth] = useState(0);
  const [currentPolar, setCurrentPolar] = useState(Math.PI / 2);
  const logoRef = useRef<THREE.Group | null>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  
  positionRef.current = position;

  // 客户端检查，避免SSR问题
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  // 鼠标移动事件
  const handlePointerMove = (e: React.PointerEvent) => {
    const rect = (e.target as HTMLDivElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // 归一化到 [-1, 1]
    const nx = (x / rect.width) * 2 - 1;
    const ny = (y / rect.height) * 2 - 1;
    
    // 更新鼠标位置用于图片旋转
    setMouseY(ny);
    mouseRef.current = { x: nx, y: ny };
    
    // 设置目标角度（方向相反）
    const newTargetAzimuth = -nx * (Math.PI / 4); // 左右旋转范围：-45度到+45度，方向相反
    const newTargetPolar = Math.PI / 2 - ny * 0.6; // 上下旋转范围：仰视俯视，方向相反
    
    setTargetAzimuth(newTargetAzimuth);
    setTargetPolar(newTargetPolar);
    
    // 设置目标位移（跟随鼠标方向）
    const newTargetPosition: [number, number, number] = [
      -nx * 0.5, // X轴位移，鼠标向右时画面向左移动
      ny * 1, // Y轴位移，鼠标向上时画面向上移动
      0 // Z轴保持不变
    ];
    setTargetPosition(newTargetPosition);
  };

  // 图片点击事件处理
  const handleImageClick = (url: string) => {
    console.log('handleImageClick 被调用，URL:', url); // 调试信息
    if (url) {
      console.log('正在打开新窗口...'); // 调试信息
      window.open(url, '_blank');
    }
  };

  // 平滑动画
  function SmoothGroup({ children }: { children: React.ReactNode }) {
    useFrame(() => {
      // 平滑相机角度变化
      const newAzimuth = currentAzimuth + (targetAzimuth - currentAzimuth) * 0.08;
      const newPolar = currentPolar + (targetPolar - currentPolar) * 0.08;
      
      setCurrentAzimuth(newAzimuth);
      setCurrentPolar(newPolar);
      
      // 更新OrbitControls角度
      if (orbitControlsRef.current) {
        orbitControlsRef.current.setAzimuthalAngle(newAzimuth);
        orbitControlsRef.current.setPolarAngle(newPolar);
      }
      
      // 平滑位移变化
      setPosition(([px, py, pz]) => {
        const [tx, ty, tz] = targetPosition;
        // 0.03 是位移跟随速度，越小越慢
        const lerp = (a: number, b: number) => a + (b - a) * 0.03;
        const nx = lerp(px, tx);
        const ny = lerp(py, ty);
        const nz = lerp(pz, tz);
        return [nx, ny, nz];
      });
    });
    return <group position={position}>{children}</group>;
  }

  // Banner 组件
  const images: ImageItem[] = [
    {
      src: "/Banner/COOPER2.webp",
      position: [7, 3, 1] as [number, number, number],
      rotation: [-Math.PI/8, -Math.PI/2, -Math.PI/8] as [number, number, number],
      size: 2.3,
      url: "https://www.cooperlighting.com"
    },
    { 
      src: "/Banner/COOPER.webp", 
      position: [6, 0.5, -2],
      rotation: [-Math.PI/10, -Math.PI/3, -Math.PI/16], 
      size: 2.5,
      url: "https://www.cooperlighting.com"
    },
    { 
      src: "/Banner/NORTH.webp", 
      position: [6.5, -2, 0.5],
      rotation: [0, -Math.PI/3, 0], 
      size: 2.5,
      url: "https://www.northface.com"
    },
    { 
      src: "/Banner/PUMA.webp", 
      position: [3, 4, -5],
      rotation: [Math.PI/8, -Math.PI/4, Math.PI/16], 
      size: 3,
      url: "https://www.puma.com"
    },
    { 
      src: "/Banner/LENVEO.webp", 
      position: [-3, 1, -5],
      rotation: [0, Math.PI/6, 0], 
      size: 3,
      url: "https://www.lenovo.com"
    },
    { 
      src: "/Banner/LINSY.webp", 
      position: [-4, -3, -0.5],
      rotation: [-Math.PI/3.5, Math.PI/6, Math.PI/10], 
      size: 4,
      url: "https://www.linsy.com"
    },
    { 
      src: "/Banner/IKEA.webp", 
      position: [-7, 1, 0],
      rotation: [0, Math.PI/3, 0], 
      size: 3,
      url: "https://www.ikea.com"
    },
  ];
  const [loadedTextures, setLoadedTextures] = useState<THREE.Texture[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadImages = async () => {
      const textures: THREE.Texture[] = [];
      for (let i = 0; i < images.length; i++) {
        const texture = await new Promise<THREE.Texture>((resolve, reject) => {
          const loader = new TextureLoader();
          loader.load(
            images[i].src,
            (texture) => resolve(texture),
            undefined,
            reject
          );
        });
        textures[i] = texture;
      }
      setLoadedTextures(textures);
      setIsLoading(false);
    };
    loadImages();
  }, [images]);

  if (isLoading) return <LoadingSpinner />;

  // 如果不在客户端，返回加载状态
  if (!isClient) {
    return (
      <div
        style={{ 
          width: '100%', 
          height: '100vh', 
          background: 'black',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white'
        }}
      >
         Loading...
      </div>
    );
  }

  return (
    <ImageErrorBoundary>
      <div
        style={{ 
          width: '100%', 
          height: '100vh', 
          background: 'black', 
          position: 'relative'
        }}
        onPointerMove={handlePointerMove}
      >
        
        {isClient && (
          <Canvas camera={{ position: [0, 0, 9], fov: 60}}>
            <ambientLight intensity={0.8} />
            <pointLight position={[10, 10, 10]} intensity={0.5} />
            <SmoothGroup>
              <DirectImages images={images} textures={loadedTextures} mouseY={mouseY} onImageClick={handleImageClick} />
              <OrbitControls
                    ref={orbitControlsRef}
                    enableZoom={false}
                    enablePan={false}
                    enableRotate={false} // 禁用默认的鼠标旋转
                    maxPolarAngle={Math.PI / 2 + 0.4}
                    minPolarAngle={Math.PI / 2 - 0.4}
                    maxAzimuthAngle={Math.PI / 4} // 最多向右旋转30度
                    minAzimuthAngle={-Math.PI / 4} // 最多向左旋转30度
                 />
              <FlashLogo ref={logoRef} mouseRef={mouseRef} />
            </SmoothGroup>
          </Canvas>
        )}

        {/* 添加调试信息 */}
        {/* <div style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          color: 'white',
          zIndex: 1000,
          fontSize: '12px',
          fontFamily: 'monospace'
        }}>
          <div>图片数量: {images?.length || 0}</div>
          <div>鼠标Y: {mouseY.toFixed(2)}</div>
          <div>点击测试: 悬停在图片上应该看到光标变化</div>
          <div style={{marginTop: '10px'}}>
            <div>图片索引和链接:</div>
            {images?.map((img, index) => (
              <div key={index} style={{fontSize: '10px', marginLeft: '10px'}}>
                {index}: {img.src.split('/').pop()} → {img.url}
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </ImageErrorBoundary>
  );
};

export default Banner;