import { ProductForm } from '../ProductForm';

export const dynamic = 'force-dynamic';

export default function NewProductPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl text-white tracking-wide">NUEVO PRODUCTO</h1>
        <p className="font-body text-sm text-white/40 mt-1">Completá los datos del producto</p>
      </div>
      <ProductForm />
    </div>
  );
}
