"use client";

import { useMemo, useState } from "react";

interface Props {
  defaultPrincipal?: number;
}

export default function EMICalculator({ defaultPrincipal = 1000000 }: Props) {
  const [principal, setPrincipal] = useState(defaultPrincipal);
  const [annualRate, setAnnualRate] = useState(9.5); // %
  const [tenureMonths, setTenureMonths] = useState(60);

  const { emi, totalInterest, totalPayment } = useMemo(() => {
    const r = annualRate / 12 / 100;
    const n = tenureMonths;
    if (r === 0) {
      const flatEmi = principal / n;
      return { emi: flatEmi, totalInterest: 0, totalPayment: principal };
    }
    const emiValue = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const total = emiValue * n;
    return { emi: emiValue, totalInterest: total - principal, totalPayment: total };
  }, [principal, annualRate, tenureMonths]);

  const fmt = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;

  return (
    <div className="rounded-brand border border-black/10 bg-white p-6">
      <h2 className="font-display text-lg font-semibold">EMI Calculator</h2>

      <Slider
        label="Loan amount"
        value={principal}
        min={100000}
        max={5000000}
        step={10000}
        display={fmt(principal)}
        onChange={setPrincipal}
      />
      <Slider
        label="Interest rate"
        value={annualRate}
        min={5}
        max={20}
        step={0.1}
        display={`${annualRate.toFixed(1)}%`}
        onChange={setAnnualRate}
      />
      <Slider
        label="Tenure"
        value={tenureMonths}
        min={12}
        max={84}
        step={6}
        display={`${tenureMonths} months`}
        onChange={setTenureMonths}
      />

      <div className="mt-6 rounded-brand bg-brand-secondary p-4">
        <p className="font-body text-sm text-brand-muted">Monthly EMI</p>
        <p className="font-display text-3xl font-bold text-brand-accent">{fmt(emi)}</p>
        <div className="mt-3 flex justify-between font-body text-sm text-brand-muted">
          <span>Total interest: {fmt(totalInterest)}</span>
          <span>Total payment: {fmt(totalPayment)}</span>
        </div>
      </div>
    </div>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  display,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (v: number) => void;
}) {
  return (
    <div className="mt-4">
      <div className="flex justify-between font-body text-sm">
        <span className="text-brand-muted">{label}</span>
        <span className="font-medium">{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full accent-brand-accent"
      />
    </div>
  );
}
