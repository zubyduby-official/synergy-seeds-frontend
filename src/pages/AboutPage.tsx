import { Link } from 'react-router-dom';
import { ArrowRight, Dna, Sprout, Shield, TrendingUp, MapPin, Target, Eye } from 'lucide-react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { corePillars, businessSettings } from '@/config/business';
import { productCategories } from '@/data/categories';
import { aboutImageUrl } from '@/lib/images';

const pillarIcons = [Dna, Sprout, Shield, TrendingUp];

export function AboutPage() {
  return (
    <div className="py-8 lg:py-12">
      <div className="container-page">
        <Breadcrumbs items={[{ label: 'About Us' }]} />

        {/* Hero */}
        <div className="relative overflow-hidden rounded-2xl bg-forest-800 mb-12">
          <img
            src={aboutImageUrl}
            alt="Green agricultural field in rural India"
            className="absolute inset-0 h-full w-full object-cover opacity-25"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-forest-900 to-forest-800/50" />
          <div className="relative px-6 py-12 sm:px-12 lg:py-16">
            <span className="badge bg-leaf-400/20 text-leaf-200 backdrop-blur-sm mb-4">
              <Sprout className="h-3.5 w-3.5" />
              About Synergy Seeds
            </span>
            <h1 className="font-display text-fluid-3xl font-extrabold text-white max-w-2xl leading-tight">
              Empowering Farmers with Quality Hybrid Seeds
            </h1>
            <p className="mt-4 max-w-xl text-forest-100/85 leading-relaxed">
              Headquartered in Indore, Madhya Pradesh — serving Indian agriculture
              with innovative hybrid vegetable seed varieties.
            </p>
          </div>
        </div>

        {/* Company Overview */}
        <section className="mb-14">
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <span className="section-eyebrow">Company Overview</span>
              <h2 className="mt-2 font-display text-fluid-2xl font-bold text-forest-800">
                About Synergy Seeds India
              </h2>
              <div className="mt-4 space-y-4 text-muted leading-[1.7]">
                <p>
                  Synergy Seeds India Private Limited, headquartered in Indore, Madhya
                  Pradesh, is a forward-thinking agricultural biotechnology and seed
                  enterprise committed to empowering farmers with high-quality hybrid
                  seed varieties.
                </p>
                <p>
                  Our breeding programme focuses on chilli, cucumber, tomato, brinjal,
                  and sweet corn — developing varieties that address the practical needs
                  of Indian farmers across diverse growing conditions. With a catalogue
                  of 21 hybrid varieties, we combine genetic precision with field-level
                  performance.
                </p>
                <p>
                  We believe quality seed is the foundation of prosperous farming. Every
                  variety in our range is selected for vigour, uniformity, and
                  market-preferred produce — giving farmers confidence from sowing to
                  harvest.
                </p>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="card p-6">
                <div className="flex items-center gap-2.5 text-forest-700 mb-4">
                  <MapPin className="h-5 w-5" />
                  <h3 className="font-display text-base font-bold">Headquarters</h3>
                </div>
                <p className="text-sm text-muted leading-relaxed">
                  {businessSettings.address}
                </p>
                <div className="mt-4 border-t border-forest-100 pt-4">
                  <p className="text-xs text-muted/70">GST Number</p>
                  <p className="mt-1 text-sm font-medium text-forest-700">{businessSettings.gst}</p>
                </div>
                <div className="mt-4 border-t border-forest-100 pt-4">
                  <p className="text-xs text-muted/70">Contact</p>
                  <p className="mt-1 text-sm font-medium text-forest-700">{businessSettings.phone}</p>
                  <p className="text-sm font-medium text-forest-700">{businessSettings.email}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Hindi Introduction */}
        <section className="mb-14">
          <div className="rounded-xl bg-botanical p-6 sm:p-8 border border-forest-100">
            <span className="section-eyebrow">हिंदी परिचय</span>
            <h2 className="mt-2 font-display text-fluid-xl font-bold text-forest-800">
              सिनर्जी सीड्स इंडिया प्राइवेट लिमिटेड
            </h2>
            <p className="mt-4 text-charcoal leading-[1.8] text-fluid-base" lang="hi">
              सिनर्जी सीड्स इंडिया प्राइवेट लिमिटेड, इंदौर, मध्य प्रदेश स्थित एक कृषि
              जैव-प्रौद्योगिकी एवं बीज कंपनी है। कंपनी मिर्च, खीरा, टमाटर, बैंगन और स्वीट
              कॉर्न की उन्नत किस्मों के माध्यम से किसानों की आवश्यकताओं को पूरा करने के लिए
              प्रतिबद्ध है।
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="mb-14">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="card p-8">
              <div className="flex items-center gap-2.5 mb-4 text-forest-700">
                <Target className="h-6 w-6" />
                <h3 className="font-display text-lg font-bold">Our Mission</h3>
              </div>
              <p className="text-muted leading-relaxed">
                To deliver superior hybrid genetics that ensure higher yields, robust
                pest resistance, and sustainable profits for farming communities.
              </p>
            </div>
            <div className="card p-8">
              <div className="flex items-center gap-2.5 mb-4 text-forest-700">
                <Eye className="h-6 w-6" />
                <h3 className="font-display text-lg font-bold">Our Vision</h3>
              </div>
              <p className="text-muted leading-relaxed">
                To be a trusted partner in Indian agriculture by developing hybrid seed
                varieties that combine innovation, quality, and practical value for
              </p>
              <p className="mt-2 text-xs text-accent-700 italic">
                [This vision statement is proposed and can be edited by the company.]
              </p>
            </div>
          </div>
        </section>

        {/* Core Pillars */}
        <section className="mb-14">
          <div className="mb-8 text-center">
            <span className="section-eyebrow">Core Pillars</span>
            <h2 className="mt-2 font-display text-fluid-2xl font-bold text-forest-800">
              What Guides Our Breeding
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {corePillars.map((pillar, index) => {
              const Icon = pillarIcons[index];
              return (
                <div key={pillar.title} className="card p-6">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-forest-50 text-forest-500">
                    <Icon className="h-7 w-7" strokeWidth={1.8} />
                  </div>
                  <h3 className="font-display text-base font-bold text-forest-800 text-center">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted text-center">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Crop Categories */}
        <section className="mb-14">
          <div className="mb-8 text-center">
            <span className="section-eyebrow">Crop Categories</span>
            <h2 className="mt-2 font-display text-fluid-2xl font-bold text-forest-800">
              Our Crop Range
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {productCategories.map((cat) => (
              <Link
                key={cat.slug}
                to={`/products?category=${cat.slug}`}
                className="card flex items-center gap-2 px-5 py-3 transition-all hover:shadow-card hover:-translate-y-0.5"
              >
                <Sprout className="h-5 w-5 text-leaf-500" />
                <span className="font-medium text-forest-700">{cat.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-2xl bg-forest-800 px-6 py-12 text-center sm:px-12">
          <h2 className="font-display text-fluid-2xl font-bold text-white">
            Ready to explore our seeds?
          </h2>
          <p className="mt-3 text-forest-100/80">
            Browse our full catalogue or reach out with any questions.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/products" className="btn-accent">
              View Products
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/contact" className="btn-outline border-leaf-300/30 bg-white/10 text-white hover:bg-white/20">
              Contact Us
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
