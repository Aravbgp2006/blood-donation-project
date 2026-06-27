import { Link } from 'react-router-dom';
import { Droplet, Users, Clock, Award, ArrowRight, Heart, ShieldCheck, PhoneCall } from 'lucide-react';

const Home = () => {
  const stats = [
    { number: '10,000+', label: 'Registered Donors', icon: Users },
    { number: '5,000+', label: 'Lives Saved', icon: Heart },
    { number: '24/7', label: 'Support Available', icon: Clock },
    { number: '50+', label: 'Partner Hospitals', icon: Award },
  ];

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const features = [
    {
      icon: Droplet,
      title: 'Easy Registration',
      description: 'Register as a donor in minutes. Our simple process gets you ready to save lives.',
    },
    {
      icon: PhoneCall,
      title: 'Instant Requests',
      description: 'Request blood urgently and connect with compatible donors in your area.',
    },
    {
      icon: ShieldCheck,
      title: 'Verified Donors',
      description: 'All donors are verified and their health records are regularly updated.',
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Join a community of heroes dedicated to saving lives through donation.',
    },
  ];

  return (
    <div className="pt-16 lg:pt-20">
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-900" />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '32px 32px' }} />

        <div className="absolute top-20 right-10 w-72 h-72 bg-primary-500/30 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl animate-pulse-slow" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left space-y-8 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium">
                <Heart className="w-4 h-4 text-primary-300 fill-primary-300" />
                <span>Trusted by over 50 hospitals nationwide</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Every Drop
                <span className="block text-primary-300">Saves a Life</span>
              </h1>

              <p className="text-lg text-white/80 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Join our community of life-savers. Register as a donor, request blood when needed,
                and help make blood donation accessible to everyone.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/register"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary-700 rounded-xl font-semibold hover:bg-primary-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  <Droplet className="w-5 h-5" />
                  Register as Donor
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  to="/request"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-500 text-white rounded-xl font-semibold hover:bg-primary-400 transition-all duration-300 border border-white/30"
                >
                  Request Blood
                </Link>
              </div>

              <div className="flex flex-wrap justify-center lg:justify-start gap-3 pt-4">
                {bloodGroups.map((group) => (
                  <div
                    key={group}
                    className="w-14 h-14 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-xl text-white font-bold text-lg border border-white/20 hover:bg-white/20 transition-colors cursor-default"
                  >
                    {group}
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary-500 to-primary-400 rounded-full blur-3xl opacity-30 transform scale-110" />
                <div className="relative w-96 h-96 flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-80 h-80 border-2 border-white/10 rounded-full animate-spin" style={{ animationDuration: '20s' }} />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-64 h-64 border-2 border-white/20 rounded-full animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Droplet className="w-32 h-32 text-white fill-white/20 animate-bounce-slow" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-secondary-50 to-transparent" />
      </section>

      <section className="py-16 bg-white -mt-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-secondary-100 hover:border-primary-200"
              >
                <stat.icon className="w-10 h-10 text-primary-500 mb-4 transition-transform group-hover:scale-110" />
                <div className="text-3xl font-bold text-secondary-900 mb-1">{stat.number}</div>
                <div className="text-secondary-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              Our platform makes blood donation simple and accessible for everyone
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-secondary-100 hover:border-primary-200 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-primary-50 rounded-2xl flex items-center justify-center group-hover:bg-primary-100 transition-colors">
                  <feature.icon className="w-8 h-8 text-primary-600 transition-transform group-hover:scale-110" />
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-3">{feature.title}</h3>
                <p className="text-secondary-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Need Blood Urgently?
              </h2>
              <p className="text-lg text-white/80 mb-8 leading-relaxed">
                Our platform connects you with thousands of verified donors in your area.
                Submit a request and get matched with compatible donors quickly.
              </p>
              <ul className="space-y-4 mb-8">
                {['Immediate donor matching', 'All blood groups available', '24/7 emergency support', 'Verified donor profiles'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <ShieldCheck className="w-6 h-6 text-primary-300 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/request"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-700 rounded-xl font-semibold hover:bg-primary-50 transition-all duration-300"
              >
                Request Blood Now
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {bloodGroups.map((group) => (
                <div
                  key={group}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 hover:bg-white/20 transition-colors"
                >
                  <div className="text-4xl font-bold mb-2">{group}</div>
                  <div className="text-sm text-white/70">Available</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 mb-4">
            Ready to Save Lives?
          </h2>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto mb-8">
            Your single donation can save up to three lives. Join our community of heroes today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-all duration-300 shadow-lg"
            >
              <Droplet className="w-5 h-5" />
              Become a Donor
            </Link>
            <Link
              to="/search"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-secondary-900 text-white rounded-xl font-semibold hover:bg-secondary-800 transition-all duration-300"
            >
              <Users className="w-5 h-5" />
              Find Donors
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
