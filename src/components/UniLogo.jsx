import logo from '../assets/uni_logo.png';

export default function UniLogo({ size = 40, radius = 12 }) {
  return (
    <img
      src={logo}
      alt="uni 로고"
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        objectFit: 'cover',
        flexShrink: 0,
        display: 'block',
      }}
    />
  );
}
