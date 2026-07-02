"use client";

import { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function FinanceForm() {
  const searchParams = useSearchParams();
  const amountParam = searchParams.get('amount');
  
  const [loanAmount, setLoanAmount] = useState<number>(amountParam ? Number(amountParam) : 150000);
  const [tenure, setTenure] = useState<number>(48);
  const [carType, setCarType] = useState<"New" | "Used">("New");
  const [carName, setCarName] = useState("");
  const [modelYear, setModelYear] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const interestRate = carType === "New" ? 8.5 : 10.5;

  const emiData = useMemo(() => {
    const P = loanAmount;
    const R = interestRate / 12 / 100;
    const N = tenure;
    
    if (R === 0) {
      const emi = P / N;
      return {
        emi: Math.round(emi),
        totalInterest: 0,
        totalAmount: P
      };
    }

    const emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    const totalAmount = emi * N;
    const totalInterest = totalAmount - P;

    return {
      emi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalAmount: Math.round(totalAmount)
    };
  }, [loanAmount, tenure, interestRate]);

  const handleSendQuery = async () => {
    if (!carName || !modelYear || !phoneNumber) {
      alert("Please fill in Car Name, Model/Year, and Phone Number.");
      return;
    }
    
    setIsSubmitting(true);
    const message = `*New Finance Query*\n\n*Client Phone:* ${phoneNumber}\n*Car Name:* ${carName}\n*Model/Year:* ${modelYear}\n*Car Type:* ${carType} Car\n*Loan Amount:* ₹${loanAmount.toLocaleString('en-IN')}\n*Tenure:* ${tenure} Months\n*Interest Rate:* ${interestRate}%\n*Estimated EMI:* ₹${emiData.emi.toLocaleString('en-IN')}/month`;
    
    try {
      const res = await fetch('/api/whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: message,
          to: "919811606000"
        })
      });
      
      if (res.ok) {
        setIsSuccess(true);
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        alert("Failed to send query. Please try again.");
      }
    } catch (error) {
      alert("Error sending query. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex-grow flex items-center justify-center relative z-20 p-margin-mobile md:p-margin-desktop">
      <div className="bg-surface-container-high border border-surface-variant w-full max-w-2xl z-40 relative flex flex-col shadow-2xl">
        <Link href="/" aria-label="Close modal" className="absolute top-4 right-4 text-on-surface hover:text-primary transition-colors">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: '\'FILL\' 0', fontWeight: '300' }}>close</span>
        </Link>

        <div className="p-8 pb-6 border-b border-surface-variant">
          <h2 className="font-headline-md text-headline-md text-on-surface">Calculate Your Monthly EMI</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-2">Adjust the parameters below to estimate your payment schedule.</p>
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-6">
            
            <div className="flex flex-col gap-3">
              <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Car Details <span className="text-primary">*</span></label>
              <div className="grid grid-cols-2 gap-4">
                <input 
                  className="bg-black border border-surface-variant text-on-surface font-body-md px-4 py-2 focus:border-primary focus:ring-0 outline-none w-full placeholder-on-surface/30" 
                  placeholder="Car Name (e.g. S-Class)" 
                  value={carName}
                  onChange={(e) => setCarName(e.target.value)}
                  required
                />
                <input 
                  className="bg-black border border-surface-variant text-on-surface font-body-md px-4 py-2 focus:border-primary focus:ring-0 outline-none w-full placeholder-on-surface/30" 
                  placeholder="Model/Year (e.g. 2023)" 
                  value={modelYear}
                  onChange={(e) => setModelYear(e.target.value)}
                  required
                />
              </div>
              <input 
                className="bg-black border border-surface-variant text-on-surface font-body-md px-4 py-2 mt-1 focus:border-primary focus:ring-0 outline-none w-full placeholder-on-surface/30" 
                placeholder="Your Phone Number" 
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>

            {/* Car Type Selection */}
            <div className="flex flex-col gap-3">
              <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Car Type</label>
              <div className="flex gap-2">
                <button 
                  onClick={() => setCarType("New")}
                  className={`flex-1 py-2 font-label-sm uppercase tracking-widest transition-colors border ${carType === "New" ? "bg-primary border-primary text-white" : "border-surface-variant text-on-surface-variant hover:text-white"}`}
                >
                  New Car
                </button>
                <button 
                  onClick={() => setCarType("Used")}
                  className={`flex-1 py-2 font-label-sm uppercase tracking-widest transition-colors border ${carType === "Used" ? "bg-primary border-primary text-white" : "border-surface-variant text-on-surface-variant hover:text-white"}`}
                >
                  Used Car
                </button>
              </div>
              <div className="text-on-surface/50 text-[11px] uppercase tracking-wider mt-1">
                Applicable Interest Rate: {interestRate}%
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-end">
                <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Loan Amount (₹)</label>
                <input 
                  className="bg-black border border-surface-variant text-on-surface font-body-md text-body-md px-3 py-1 w-32 text-right focus:border-primary focus:ring-0 outline-none transition-colors" 
                  type="number" 
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                />
              </div>
              <input 
                max="10000000" 
                min="50000" 
                step="10000" 
                type="range" 
                value={loanAmount} 
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full h-1 bg-surface-variant rounded-lg appearance-none cursor-pointer accent-primary" 
              />
              <div className="flex justify-between font-label-sm text-label-sm text-on-surface/50"><span>₹50k</span><span>₹1Cr</span></div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-end">
                <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Tenure (Months)</label>
                <input 
                  className="bg-black border border-surface-variant text-on-surface font-body-md text-body-md px-3 py-1 w-24 text-right focus:border-primary focus:ring-0 outline-none transition-colors" 
                  type="number" 
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                />
              </div>
              <input 
                max="84" 
                min="12" 
                step="12" 
                type="range" 
                value={tenure} 
                onChange={(e) => setTenure(Number(e.target.value))}
                className="w-full h-1 bg-surface-variant rounded-lg appearance-none cursor-pointer accent-primary" 
              />
              <div className="flex justify-between font-label-sm text-label-sm text-on-surface/50">
                <span>12</span>
                <span>84</span>
              </div>
            </div>

          </div>

          <div className="flex flex-col justify-center items-center p-6 bg-black border border-surface-variant relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-50 pointer-events-none"></div>
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-4 z-10">Estimated Monthly EMI</span>
            <div className="flex items-start text-primary z-10">
              <span className="font-headline-md text-headline-md mt-2 mr-1">₹</span>
              <span className="font-headline-xl text-headline-xl">{emiData.emi.toLocaleString('en-IN')}</span>
            </div>
            <div className="w-full h-[1px] bg-surface-variant my-6 z-10"></div>
            <div className="flex justify-between w-full font-label-sm text-label-sm z-10">
              <span className="text-on-surface-variant">Total Interest:</span>
              <span className="text-on-surface">₹{emiData.totalInterest.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between w-full font-label-sm text-label-sm mt-2 z-10">
              <span className="text-on-surface-variant">Total Amount:</span>
              <span className="text-on-surface">₹{emiData.totalAmount.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        <div className="p-8 pt-0 mt-4 border-t border-surface-variant pt-6">
          <button 
            onClick={handleSendQuery}
            disabled={isSubmitting || isSuccess}
            className="w-full bg-primary text-white uppercase font-label-md text-label-md py-4 transition-all duration-300 hover:brightness-110 active:scale-95 flex items-center justify-center gap-3 disabled:opacity-80 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span>Sending...</span>
            ) : isSuccess ? (
              <>
                <span>Query Sent Successfully!</span>
                <span className="material-symbols-outlined">check_circle</span>
              </>
            ) : (
              <>
                <span>Send Query</span>
                <span className="material-symbols-outlined">send</span>
              </>
            )}
          </button>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-primary"></div>
      </div>
    </main>
  );
}

export default function FinancePage() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <Suspense fallback={<div className="flex-grow flex items-center justify-center h-96"><div className="animate-pulse text-white">Loading...</div></div>}>
        <FinanceForm />
      </Suspense>
    </div>
  );
}
