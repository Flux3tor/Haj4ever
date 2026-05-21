export default function Home() {
  return (
    <div className="bg-slate-950 text-white">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 pt-16">
        <div className="text-center">
          <img src="/Logo.svg" alt="Haj4ever" className="h-32 mx-auto mb-8" />
          <p className="text-sm text-gray-400 mb-8 border-b-2 border-blue-400 pb-4 inline-block">
            solve hidden mysteries | get a closer
          </p>
          <div className="flex gap-4 justify-center">
            <button className="px-6 py-2 border border-blue-400 text-blue-400 rounded hover:bg-blue-400 hover:text-slate-950 transition">
              Verify
            </button>
            <button className="px-6 py-2 border border-blue-400 text-blue-400 rounded hover:bg-blue-400 hover:text-slate-950 transition">
              Register
            </button>
          </div>
        </div>
      </section>

      {/* Wave divider 1 */}
      <div className="h-20 bg-gradient-to-b from-slate-950 to-blue-500 relative overflow-hidden">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,50 Q300,0 600,50 T1200,50 L1200,120 L0,120 Z" fill="currentColor" className="text-blue-500"/>
        </svg>
      </div>

      {/* How does this work Section */}
      <section className="bg-blue-500 px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-2">How does this work?</h2>
            <p className="text-blue-100">If you are confused! This will help you (hopefully?)</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-950 rounded-2xl h-48"></div>
            <div className="bg-slate-950 rounded-2xl h-48"></div>
          </div>
        </div>
      </section>

      {/* Wave divider 2 */}
      <div className="h-20 bg-gradient-to-b from-blue-500 to-slate-950 relative overflow-hidden">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,50 Q300,100 600,50 T1200,50 L1200,0 L0,0 Z" fill="currentColor" className="text-slate-950"/>
        </svg>
      </div>

      {/* Rules and Guidelines Section */}
      <section className="bg-slate-950 px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-2">Rules and Guidelines</h2>
            <p className="text-gray-400">If you want a haj you must follow these!</p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-4 h-4 bg-blue-500 rounded-full flex-shrink-0"></div>
              <div className="h-6 bg-blue-500 rounded flex-grow"></div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-4 h-4 bg-blue-500 rounded-full flex-shrink-0"></div>
              <div className="h-6 bg-blue-500 rounded flex-grow"></div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-4 h-4 bg-blue-500 rounded-full flex-shrink-0"></div>
              <div className="h-6 bg-blue-500 rounded flex-grow"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Wave divider 3 */}
      <div className="h-20 bg-gradient-to-b from-slate-950 to-blue-500 relative overflow-hidden">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,50 Q300,0 600,50 T1200,50 L1200,120 L0,120 Z" fill="currentColor" className="text-blue-500"/>
        </svg>
      </div>

      {/* FAQs Section */}
      <section className="bg-blue-500 px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-2">FAQs</h2>
            <p className="text-blue-100">Some of your pressing questions about CIPHER has been answered below:</p>
          </div>
          <div className="space-y-4">
            <div className="bg-slate-950 h-12 rounded"></div>
            <div className="bg-slate-950 h-12 rounded"></div>
            <div className="bg-slate-950 h-12 rounded"></div>
            <div className="bg-slate-800 h-12 rounded"></div>
          </div>
        </div>
      </section>

      {/* Wave divider 4 */}
      <div className="h-20 bg-gradient-to-b from-blue-500 to-slate-950 relative overflow-hidden">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,50 Q300,100 600,50 T1200,50 L1200,0 L0,0 Z" fill="currentColor" className="text-slate-950"/>
        </svg>
      </div>

      {/* Footer */}
      <footer className="bg-slate-950 px-4 py-12 text-center">
        <p className="text-lg font-semibold mb-1">haj4ever</p>
        <p className="text-gray-500">by <span className="text-red-500 font-bold">Hack Club</span></p>
      </footer>
    </div>
  );
}