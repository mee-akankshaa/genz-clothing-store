import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-20 text-center">
      <h1 className="h-big">404. Wrong aisle.</h1>
      <Link href="/shop" className="btn mt-8">Back to shop</Link>
    </div>
  );
}
