import SectionPadding from "../../../layouts/SectionPadding";

const shippingLogos = Array.from({ length: 9 }, (_, index) => ({
  src: `/ship-logos/l${index + 1}.png`,
  alt: `Shipping partner logo ${index + 1}`,
}));

export default function LogoMarquee() {
  return (
    <SectionPadding className="border-y border-border bg-background py-8 sm:py-10">
      <div className="mx-auto max-w-7xl">
        <p className="mb-6 text-center text-sm font-semibold uppercase text-muted-foreground">
          Logistics company
        </p>

        <div className="logo-marquee" aria-label="Logistics company logos">
          <div className="logo-marquee__track">
            <div className="logo-marquee__group">
              {shippingLogos.map((logo) => (
                <img
                  key={logo.src}
                  src={logo.src}
                  alt={logo.alt}
                  className="logo-marquee__item"
                  draggable={false}
                />
              ))}
            </div>

            <div className="logo-marquee__group" aria-hidden="true">
              {shippingLogos.map((logo) => (
                <img
                  key={`${logo.src}-duplicate`}
                  src={logo.src}
                  alt=""
                  className="logo-marquee__item"
                  draggable={false}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionPadding>
  );
}
