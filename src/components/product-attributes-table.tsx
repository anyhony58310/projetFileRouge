import { FC } from "react";
import { ProductRating } from "@arthur.eudeline/starbucks-tp-kit/components/products/product-rating";
import styles from './product-attributes-table.module.css';

export type ProductAttribute = { label: string; rating: number };

type Props = {
  data: Array<{ label: string; rating: number }>;
  className?: string,
};

export const ProductAttributesTable: FC<Props> = function ({ data, className = ''}) {
  return (
    <table className={`${styles.table} ${className}`}>
      <tbody>
        {data.map((attr, i) => (
          <tr key={i}>
            <td>{attr.label}</td>
            <td>
              <div className="w-full flex justify-end">
                <ProductRating value={attr.rating} icon="circle" />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
