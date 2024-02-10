export default function Logo({ ...rest }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="52"
      height="45"
      viewBox="0 0 52 45"
      fill="none"
      {...rest}
    >
      <rect y="3.5" width="43" height="8" fill="#7F4E25" />
      <rect y="28.5" width="43" height="8" fill="#7F4E25" />
      <rect x="9" y="16.5" width="43" height="8" fill="#CA9D66" />
      <path
        d="M2 1.5H47V13.8802H2V26.7231H47V38.9876H42.5344M2 38.9876H7.03817M7.03817 38.9876V43.5H7.9542V38.9876M7.03817 38.9876H7.9542M7.9542 38.9876H41.3893M41.3893 38.9876V43.5H42.5344V38.9876M41.3893 38.9876H42.5344"
        stroke="black"
        strokeWidth="1.4"
      />
      <path d="M18 7.5H25" stroke="black" strokeWidth="1.4" />
      <path d="M18 32.5H25" stroke="black" strokeWidth="1.4" />
      <path d="M27 20.5H34" stroke="black" strokeWidth="1.4" />
    </svg>
  );
}
