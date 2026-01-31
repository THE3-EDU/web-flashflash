import * as THREE from "three";
import { Svg } from "@react-three/drei";
import { forwardRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { getAssetPath } from "../../utils/path";


type FlashLogoProps = React.ComponentProps<'group'> & {
  mouseRef: React.RefObject<{ x: number; y: number }>;
};

export const FlashLogo = forwardRef<THREE.Group, FlashLogoProps>(
  function FlashLogo({ mouseRef, ...props }, ref) {
    const [scale, setScale] = useState(0.04);

    useEffect(() => {
      const updateScale = () => {
        const width = window.innerWidth;
        let newScale = 0.04;

        if (width < 640) {
          newScale = 0.023;
        } else if (width < 1024) {
          newScale = 0.035;
        } else if (width < 1280) {
          newScale = 0.04;
        } else {
          newScale = 0.04;
        }

        setScale(newScale);
      };

      updateScale();
      window.addEventListener('resize', updateScale);

      return () => {
        window.removeEventListener('resize', updateScale);
      };
    }, []);

    const svgWidth = 202;
    const centerX = -svgWidth / 2 * scale;

    useFrame(() => {
      const group = ref as React.RefObject<THREE.Group>;
      if (group.current && mouseRef.current) {
        group.current.rotation.x = mouseRef.current.y * 0.5;
        group.current.rotation.y = mouseRef.current.x * 0.005;
      }
    });

    return (
      <group ref={ref} {...props}>
        <Svg 
          src={getAssetPath("/Logo/logo.svg")} 
          scale={[scale, scale, scale]}
          position={[centerX, 0.5, 0]}
        />
      </group>
    );
  }
);