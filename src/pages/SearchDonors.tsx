import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Search, MapPin, Phone, Mail, Droplet, Filter, Loader2, User } from 'lucide-react';

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

interface Donor {
  id: string;
  full_name: string;
  blood_group: string;
  age: number;
  gender: string;
  city: string;
  state: string;
  phone: string;
  email: string;
  is_available: boolean;
  last_donation_date: string | null;
}

const SearchDonors = () => {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    blood_group: '',
    city: '',
    state: '',
  });

  useEffect(() => {
    searchDonors();
  }, []);

  const searchDonors = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('donors')
        .select('*')
        .eq('is_available', true)
        .order('created_at', { ascending: false });

      if (filters.blood_group) {
        query = query.eq('blood_group', filters.blood_group);
      }
      if (filters.city) {
        query = query.ilike('city', `%${filters.city}%`);
      }
      if (filters.state) {
        query = query.ilike('state', `%${filters.state}%`);
      }

      const { data, error } = await query.limit(50);

      if (error) throw error;
      setDonors(data || []);
    } catch (error) {
      console.error('Error fetching donors:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchDonors();
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-secondary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-2xl mb-6">
            <Search className="w-8 h-8 text-primary-600" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-secondary-900 mb-4">
            Find Blood Donors
          </h1>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            Search our database of registered donors by blood group and location.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex items-center gap-2 mb-6">
            <Filter className="w-5 h-5 text-primary-600" />
            <h2 className="text-lg font-semibold text-secondary-900">Filter Donors</h2>
          </div>

          <form onSubmit={handleSearch} className="grid sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Blood Group
              </label>
              <select
                name="blood_group"
                value={filters.blood_group}
                onChange={handleFilterChange}
                className="w-full px-4 py-3 border border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all bg-white"
              >
                <option value="">All Groups</option>
                {bloodGroups.map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                City
              </label>
              <input
                type="text"
                name="city"
                value={filters.city}
                onChange={handleFilterChange}
                className="w-full px-4 py-3 border border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                placeholder="Enter city"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                State
              </label>
              <input
                type="text"
                name="state"
                value={filters.state}
                onChange={handleFilterChange}
                className="w-full px-4 py-3 border border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                placeholder="Enter state"
              />
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    Search
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-secondary-900">
            {donors.length} Donor{donors.length !== 1 ? 's' : ''} Found
          </h2>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-10 h-10 text-primary-600 animate-spin" />
          </div>
        ) : donors.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-md">
            <User className="w-16 h-16 text-secondary-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-secondary-900 mb-2">No Donors Found</h3>
            <p className="text-secondary-600">Try adjusting your search filters or check back later.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {donors.map((donor) => (
              <div
                key={donor.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className="bg-gradient-to-r from-primary-600 to-primary-500 p-6">
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                      <User className="w-8 h-8 text-white" />
                    </div>
                    <div className="bg-white px-4 py-2 rounded-xl">
                      <span className="text-2xl font-bold text-primary-600">{donor.blood_group}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-secondary-900">{donor.full_name}</h3>
                    <p className="text-secondary-600 text-sm">{donor.age} years old, {donor.gender}</p>
                  </div>

                  <div className="flex items-center gap-2 text-secondary-600">
                    <MapPin className="w-4 h-4 text-primary-500" />
                    <span className="text-sm">{donor.city}, {donor.state}</span>
                  </div>

                  <div className="flex items-center gap-2 text-secondary-600">
                    <Phone className="w-4 h-4 text-primary-500" />
                    <span className="text-sm">{donor.phone}</span>
                  </div>

                  <div className="flex items-center gap-2 text-secondary-600">
                    <Mail className="w-4 h-4 text-primary-500" />
                    <span className="text-sm truncate">{donor.email}</span>
                  </div>

                  <div className="pt-4 border-t border-secondary-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${donor.is_available ? 'bg-green-500' : 'bg-secondary-400'}`} />
                      <span className="text-sm text-secondary-600">
                        {donor.is_available ? 'Available' : 'Unavailable'}
                      </span>
                    </div>
                    {donor.last_donation_date && (
                      <span className="text-xs text-secondary-500">
                        Last: {new Date(donor.last_donation_date).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchDonors;
