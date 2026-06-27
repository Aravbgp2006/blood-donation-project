import { Heart, Target, Users, Award, ShieldCheck, Clock, CheckCircle } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Heart,
      title: 'Compassion',
      description: 'We believe in the power of human kindness and the importance of giving back to the community.',
    },
    {
      icon: ShieldCheck,
      title: 'Safety',
      description: 'We maintain strict health and safety standards to protect both donors and recipients.',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Building a connected network of donors, hospitals, and those in need.',
    },
    {
      icon: Target,
      title: 'Accessibility',
      description: 'Making blood donation accessible to everyone, everywhere, when they need it most.',
    },
  ];

  const milestones = [
    { year: '2018', title: 'Founded', description: 'BloodLife was established with a mission to save lives.' },
    { year: '2019', title: 'First 1,000 Donors', description: 'Reached our first milestone of registered donors.' },
    { year: '2020', title: 'Partnered with 20 Hospitals', description: 'Expanded our network across multiple healthcare facilities.' },
    { year: '2022', title: '10,000+ Lives Saved', description: 'Celebrated saving over 10,000 lives through donations.' },
    { year: '2024', title: 'National Expansion', description: 'Expanded operations to serve communities nationwide.' },
  ];

  const team = [
    { name: 'Dr. Sarah Mitchell', role: 'Medical Director', image: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { name: 'James Thompson', role: 'Executive Director', image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { name: 'Dr. Michael Chen', role: 'Chief Surgeon', image: 'https://images.pexels.com/photos/5409830/pexels-photo-5409830.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { name: 'Emily Rodriguez', role: 'Community Manager', image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=300' },
  ];

  return (
    <div className="pt-24 pb-16">
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 animate-fade-in">About BloodLife</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            We are on a mission to save lives by connecting blood donors with those in need.
            Our platform makes blood donation simple, accessible, and impactful.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-secondary-900 mb-6">Our Mission</h2>
              <p className="text-lg text-secondary-600 leading-relaxed mb-6">
                BloodLife was founded with a simple yet powerful vision: to ensure that no one loses their life
                due to a lack of available blood. We connect voluntary donors with patients in need, creating
                a seamless bridge between generosity and necessity.
              </p>
              <p className="text-lg text-secondary-600 leading-relaxed mb-8">
                Every two seconds, someone needs blood. Your single donation can save up to three lives.
                We're here to make that connection happen quickly and safely.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-primary-500 flex-shrink-0 mt-0.5" />
                  <span className="text-secondary-700">Verified Donors</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-primary-500 flex-shrink-0 mt-0.5" />
                  <span className="text-secondary-700">24/7 Support</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-primary-500 flex-shrink-0 mt-0.5" />
                  <span className="text-secondary-700">Fast Matching</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-primary-500 flex-shrink-0 mt-0.5" />
                  <span className="text-secondary-700">Secure Platform</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/6970700/pexels-photo-6970700.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Blood donation"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-primary-600 text-white p-6 rounded-2xl shadow-xl">
                <div className="text-3xl font-bold">50+</div>
                <div className="text-white/80">Partner Hospitals</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">Our Values</h2>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-primary-100 rounded-2xl flex items-center justify-center">
                  <value.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-3">{value.title}</h3>
                <p className="text-secondary-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">Our Journey</h2>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              Milestones that mark our growth and impact
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-primary-100 hidden md:block" />
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                      <div className="text-primary-600 font-bold text-lg mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-semibold text-secondary-900 mb-2">{milestone.title}</h3>
                      <p className="text-secondary-600">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="hidden md:flex items-center justify-center w-12 h-12 bg-primary-600 rounded-full text-white font-bold z-10">
                    <Award className="w-6 h-6" />
                  </div>
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">Meet Our Team</h2>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              Dedicated professionals committed to saving lives
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-lg font-semibold text-secondary-900">{member.name}</h3>
                  <p className="text-primary-600">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Clock className="w-16 h-16 mx-auto mb-6 text-primary-300" />
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Every Second Counts</h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
            Your donation can be the difference between life and death. Join our community of life-savers today.
          </p>
          <a
            href="/register"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-700 rounded-xl font-semibold hover:bg-primary-50 transition-all duration-300"
          >
            <Heart className="w-5 h-5" />
            Become a Donor
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;
