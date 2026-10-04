import SectionPadding from "../../../layouts/SectionPadding";

export default function AboutSection() {
  return (
    <section id="about" className="w-full scroll-mt-6 bg-background">
      <SectionPadding className="py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <h2 className="mb-6 text-3xl font-medium text-gray-950 lg:text-4xl">
              ABOUT US
            </h2>
            
            <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
              <p>
                ParcelFinda brings tracking details from your shipment record into one clear view.
                Enter the tracking number you received to review the latest available status and route information.
              </p>
              
              <p>
                When a delivery needs attention, contact support with that same tracking ID.
                Your message is automatically routed to the team responsible for the parcel.
              </p>
            </div>

            {/* Stats or Features */}
            <div className="grid grid-cols-2 gap-6 pt-8">
              <div className="text-center lg:text-left">
                <div className="mb-2 text-3xl font-medium text-gray-950">One ID</div>
                <div className="text-sm text-muted-foreground">Tracking and support</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="mb-2 text-3xl font-medium text-gray-950">24/7</div>
                <div className="text-sm text-muted-foreground">Customer Support</div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-6">
              <a href="#contact" className="inline-flex bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-lg font-semibold transition-colors">Contact parcel support</a>
            </div>
          </div>

          {/* Image */}
          <div className="relative order-first lg:order-last">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="/sea.jpg" 
                alt="Parcel shipment moving through a port"
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
              
              {/* Overlay with decorative elements */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              
              {/* Floating badge */}
              <div className="absolute top-6 left-6 bg-card/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-foreground">Trusted Worldwide</span>
                </div>
              </div>
              
              {/* Bottom stats card */}
              <div className="absolute bottom-6 right-6 bg-card/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-medium text-gray-950">Direct</div>
                  <div className="text-xs text-muted-foreground">Support routing</div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-slate-200/50 blur-xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full bg-slate-200/50 blur-xl" />
          </div>
        </div>
      </SectionPadding>
    </section>
  );
}
