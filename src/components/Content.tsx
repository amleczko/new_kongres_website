export function Content() {
  return (
    <section className="w-full py-16 lg:py-24 bg-[rgba(109,158,203,0.3)]">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 
              className="mb-4 text-3xl md:text-4xl lg:text-5xl"
              style={{ 
                fontFamily: "p22-mackinac-pro, serif"
              }}
            >
              Our Product
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover the features that make our solution stand out from the competition
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-background rounded-lg border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="mb-3">Fast Performance</h3>
              <p className="text-muted-foreground">
                Lightning-fast loading times and optimized performance for the best user experience.
              </p>
            </div>
            
            <div className="p-6 bg-background rounded-lg border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="mb-3">Secure & Reliable</h3>
              <p className="text-muted-foreground">
                Built with security in mind, ensuring your data and users are always protected.
              </p>
            </div>
            
            <div className="p-6 bg-background rounded-lg border md:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="mb-3">Easy to Use</h3>
              <p className="text-muted-foreground">
                Intuitive interface designed for users of all skill levels, from beginners to experts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}