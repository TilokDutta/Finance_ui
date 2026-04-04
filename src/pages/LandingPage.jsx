import Navbar from "../components/Navbar";

export default function LandingPage() {
  return (
    <div>
      <Navbar />
      <section className="max-w-6xl mx-auto px-6 pt-40 pb-16 text-center">
        <h1 className="text-5xl md:text-8xl font-bold text-gray-900 leading-[1.05]">
          Advance your business.
          <br />
          <span className="text-[#E8604A]">Simplify your finances.</span>
        </h1>
        <p className="text-lg text-gray-500 max-w-xl mx-auto mb-10 pt-15">
          Transform how you handle financial transaction with automated controls
          and advanced warning system.
        </p>
      </section>
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="relative rounded-3xl overflow-hidden border border-gray-200 shadow-2xl bg-white">
          {/* Fake browser bar */}
          <div className="flex items-center gap-2 px-5 py-3 border-b border-gray-100 bg-gray-50">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
            <div className="ml-4 bg-white rounded-md px-3 py-1 text-xs text-gray-400 max-w-xs border border-gray-200">
              flourish.app/dashboard
            </div>
          </div>

          {/* Mock Dashboard */}
          <div className="flex h-80 overflow-hidden">
            <div className="w-52 border-r border-gray-100 bg-white p-4 hidden md:block">
              <div className="w-8 h-8 bg-black rounded-full mb-6" />
              {["Overview", "Transactions", "Insights"].map((item, i) => (
                <div
                  key={item}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2 mb-1 text-sm ${i === 0 ? "bg-orange-50 text-[#E8604A] font-semibold" : "text-gray-400"}`}
                >
                  <div
                    className={`w-4 h-4 rounded ${i === 0 ? "bg-[#E8604A]" : "bg-gray-200"}`}
                  />
                  {item}
                </div>
              ))}
            </div>

            <div className="flex-1 p-6 bg-[#F5F5F0]">
              <div className="grid grid-cols-3 gap-4 mb-4">
                {["Total Balance", "Income", "Expenses"].map((label, i) => (
                  <div
                    key={label}
                    className="bg-white rounded-xl p-4 shadow-sm"
                  >
                    <div className="text-xs text-gray-400 mb-1">{label}</div>
                    <div
                      className={`text-lg font-bold ${i === 2 ? "text-[#E8604A]" : "text-gray-900"}`}
                    >
                      {i === 0
                        ? "₹3,24,800"
                        : i === 1
                          ? "₹5,10,000"
                          : "₹1,85,200"}
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="text-xs text-gray-400 mb-3">
                    Balance Trend
                  </div>
                  <div className="flex items-end gap-1 h-12">
                    {[40, 55, 45, 70, 60, 80].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t"
                        style={{
                          height: `${h}%`,
                          background: i === 5 ? "#E8604A" : "#E8604A33",
                        }}
                      />
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="text-xs text-gray-400 mb-3">Spending</div>
                  <div className="flex gap-2 flex-wrap">
                    {["Rent", "Food", "Travel", "Shopping"].map((c, i) => (
                      <span
                        key={c}
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{
                          background: [
                            "#6BB5FF22",
                            "#E8604A22",
                            "#B06BFF22",
                            "#FFD96B22",
                          ][i],
                          color: ["#6BB5FF", "#E8604A", "#B06BFF", "#d4a00a"][
                            i
                          ],
                        }}
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="border-t border-gray-100 py-8 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          {/* <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-black rounded-full" />
            <span className="font-bold text-gray-600">Financify</span>
          </div> */}
          <p>© 2026 Financify. Built for Assessment purposes.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-600 transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-gray-600 transition-colors">
              Terms
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
