import type { TextField } from "@/entities/consultation/model/types";
import { products } from "@/entities/product/model/mock-products";
import { fieldClass } from "./consultationStyles";

type ConsultationContactFieldsProps = {
  name: string;
  phone: string;
  productId: string;
  password: string;
  onChange: (field: TextField, value: string) => void;
};

export function ConsultationContactFields({
  name,
  phone,
  productId,
  password,
  onChange
}: ConsultationContactFieldsProps) {
  return (
    <>
      <label className={fieldClass}>
        이름
        <input value={name} onChange={(event) => onChange("name", event.target.value)} />
      </label>
      <label className={fieldClass}>
        휴대폰 번호
        <input value={phone} onChange={(event) => onChange("phone", event.target.value)} />
      </label>
      <label className={fieldClass}>
        문의 상품
        <select value={productId} onChange={(event) => onChange("productId", event.target.value)}>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
      </label>
      <label className={fieldClass}>
        신청 내역 조회용 비밀번호
        <input
          type="password"
          value={password}
          onChange={(event) => onChange("password", event.target.value)}
        />
      </label>
    </>
  );
}
