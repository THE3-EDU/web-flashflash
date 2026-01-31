import Banner from "../components/home/Banner";

export default function Home() {
  return (
    <div 
      className="mx-auto"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none', // 关键
        zIndex: 1
      }}
    >
        <Banner />
    </div>
  );
}