import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import {
  Users,
  Droplet,
  FileText,
  Mail,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
  Search,
  Filter,
  ChevronDown,
} from 'lucide-react';

interface Donor {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  blood_group: string;
  city: string;
  is_available: boolean;
  created_at: string;
}

interface BloodRequest {
  id: string;
  patient_name: string;
  blood_group: string;
  units_required: number;
  hospital_name: string;
  city: string;
  urgency: string;
  status: string;
  created_at: string;
}

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'donors' | 'requests' | 'messages'>('overview');
  const [donors, setDonors] = useState<Donor[]>([]);
  const [requests, setRequests] = useState<BloodRequest[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalDonors: 0,
    activeDonors: 0,
    pendingRequests: 0,
    fulfilledRequests: 0,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [donorsRes, requestsRes, messagesRes] = await Promise.all([
        supabase.from('donors').select('*').order('created_at', { ascending: false }).limit(100),
        supabase.from('blood_requests').select('*').order('created_at', { ascending: false }).limit(100),
        supabase.from('contact_messages').select('*').order('created_at', { ascending: false }).limit(50),
      ]);

      if (donorsRes.data) {
        setDonors(donorsRes.data);
        setStats((prev) => ({
          ...prev,
          totalDonors: donorsRes.data?.length || 0,
          activeDonors: donorsRes.data?.filter((d) => d.is_available).length || 0,
        }));
      }

      if (requestsRes.data) {
        setRequests(requestsRes.data);
        setStats((prev) => ({
          ...prev,
          pendingRequests: requestsRes.data?.filter((r) => r.status === 'pending').length || 0,
          fulfilledRequests: requestsRes.data?.filter((r) => r.status === 'fulfilled').length || 0,
        }));
      }

      if (messagesRes.data) {
        setMessages(messagesRes.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateRequestStatus = async (id: string, status: string) => {
    try {
      await supabase.from('blood_requests').update({ status }).eq('id', id);
      fetchData();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const markMessageRead = async (id: string) => {
    try {
      await supabase.from('contact_messages').update({ is_read: true }).eq('id', id);
      fetchData();
    } catch (error) {
      console.error('Error marking message read:', error);
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'donors', label: 'Donors', icon: Users },
    { id: 'requests', label: 'Requests', icon: Droplet },
    { id: 'messages', label: 'Messages', icon: Mail },
  ];

  return (
    <div className="pt-24 pb-16 min-h-screen bg-secondary-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-secondary-900">Admin Dashboard</h1>
            <p className="text-secondary-600">Manage donors, requests, and messages</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-secondary-600">
            <Clock className="w-4 h-4" />
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'bg-white text-secondary-700 hover:bg-secondary-50 border border-secondary-200'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent" />
          </div>
        ) : (
          <>
            {activeTab === 'overview' && (
              <div className="space-y-8 animate-fade-in">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white rounded-2xl shadow-md p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Users className="w-10 h-10 text-blue-500" />
                      <span className="text-xs text-secondary-500 bg-secondary-100 px-2 py-1 rounded-full">Total</span>
                    </div>
                    <div className="text-3xl font-bold text-secondary-900">{stats.totalDonors}</div>
                    <div className="text-secondary-600">Registered Donors</div>
                  </div>

                  <div className="bg-white rounded-2xl shadow-md p-6">
                    <div className="flex items-center justify-between mb-4">
                      <CheckCircle className="w-10 h-10 text-green-500" />
                      <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">Active</span>
                    </div>
                    <div className="text-3xl font-bold text-secondary-900">{stats.activeDonors}</div>
                    <div className="text-secondary-600">Available Donors</div>
                  </div>

                  <div className="bg-white rounded-2xl shadow-md p-6">
                    <div className="flex items-center justify-between mb-4">
                      <AlertCircle className="w-10 h-10 text-amber-500" />
                      <span className="text-xs text-amber-600 bg-amber-100 px-2 py-1 rounded-full">Pending</span>
                    </div>
                    <div className="text-3xl font-bold text-secondary-900">{stats.pendingRequests}</div>
                    <div className="text-secondary-600">Blood Requests</div>
                  </div>

                  <div className="bg-white rounded-2xl shadow-md p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Droplet className="w-10 h-10 text-primary-500" />
                      <span className="text-xs text-primary-600 bg-primary-100 px-2 py-1 rounded-full">Fulfilled</span>
                    </div>
                    <div className="text-3xl font-bold text-secondary-900">{stats.fulfilledRequests}</div>
                    <div className="text-secondary-600">Requests Fulfilled</div>
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="bg-white rounded-2xl shadow-md p-6">
                    <h3 className="text-lg font-semibold text-secondary-900 mb-4 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary-500" />
                      Recent Requests
                    </h3>
                    <div className="space-y-4">
                      {requests.slice(0, 5).map((req) => (
                        <div
                          key={req.id}
                          className="flex items-center justify-between p-4 bg-secondary-50 rounded-xl"
                        >
                          <div>
                            <div className="font-medium text-secondary-900">{req.patient_name}</div>
                            <div className="text-sm text-secondary-600">
                              {req.blood_group} - {req.units_required} unit(s)
                            </div>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              req.status === 'pending'
                                ? 'bg-amber-100 text-amber-700'
                                : req.status === 'fulfilled'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-secondary-100 text-secondary-700'
                            }`}
                          >
                            {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl shadow-md p-6">
                    <h3 className="text-lg font-semibold text-secondary-900 mb-4 flex items-center gap-2">
                      <Users className="w-5 h-5 text-primary-500" />
                      Recent Donors
                    </h3>
                    <div className="space-y-4">
                      {donors.slice(0, 5).map((donor) => (
                        <div
                          key={donor.id}
                          className="flex items-center justify-between p-4 bg-secondary-50 rounded-xl"
                        >
                          <div>
                            <div className="font-medium text-secondary-900">{donor.full_name}</div>
                            <div className="text-sm text-secondary-600">{donor.email}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-primary-600">{donor.blood_group}</span>
                            <div
                              className={`w-2 h-2 rounded-full ${
                                donor.is_available ? 'bg-green-500' : 'bg-secondary-400'
                              }`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'donors' && (
              <div className="bg-white rounded-2xl shadow-md overflow-hidden animate-fade-in">
                <div className="p-6 border-b border-secondary-200">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <h2 className="text-lg font-semibold text-secondary-900">All Donors</h2>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-400" />
                        <input
                          type="text"
                          placeholder="Search donors..."
                          className="pl-9 pr-4 py-2 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-secondary-50">
                      <tr>
                        <th className="text-left px-6 py-4 text-sm font-medium text-secondary-700">Name</th>
                        <th className="text-left px-6 py-4 text-sm font-medium text-secondary-700">Blood Group</th>
                        <th className="text-left px-6 py-4 text-sm font-medium text-secondary-700">Location</th>
                        <th className="text-left px-6 py-4 text-sm font-medium text-secondary-700">Phone</th>
                        <th className="text-left px-6 py-4 text-sm font-medium text-secondary-700">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-secondary-100">
                      {donors.map((donor) => (
                        <tr key={donor.id} className="hover:bg-secondary-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="font-medium text-secondary-900">{donor.full_name}</div>
                            <div className="text-sm text-secondary-600">{donor.email}</div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="font-bold text-primary-600">{donor.blood_group}</span>
                          </td>
                          <td className="px-6 py-4 text-secondary-700">{donor.city}</td>
                          <td className="px-6 py-4 text-secondary-700">{donor.phone}</td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                                donor.is_available
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-secondary-100 text-secondary-700'
                              }`}
                            >
                              <div
                                className={`w-1.5 h-1.5 rounded-full ${
                                  donor.is_available ? 'bg-green-500' : 'bg-secondary-400'
                                }`}
                              />
                              {donor.is_available ? 'Available' : 'Unavailable'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'requests' && (
              <div className="bg-white rounded-2xl shadow-md overflow-hidden animate-fade-in">
                <div className="p-6 border-b border-secondary-200">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <h2 className="text-lg font-semibold text-secondary-900">Blood Requests</h2>
                    <div className="flex items-center gap-2">
                      <Filter className="w-4 h-4 text-secondary-500" />
                      <select className="border border-secondary-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500">
                        <option value="">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="fulfilled">Fulfilled</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-secondary-50">
                      <tr>
                        <th className="text-left px-6 py-4 text-sm font-medium text-secondary-700">Patient</th>
                        <th className="text-left px-6 py-4 text-sm font-medium text-secondary-700">Blood</th>
                        <th className="text-left px-6 py-4 text-sm font-medium text-secondary-700">Hospital</th>
                        <th className="text-left px-6 py-4 text-sm font-medium text-secondary-700">Urgency</th>
                        <th className="text-left px-6 py-4 text-sm font-medium text-secondary-700">Status</th>
                        <th className="text-left px-6 py-4 text-sm font-medium text-secondary-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-secondary-100">
                      {requests.map((req) => (
                        <tr key={req.id} className="hover:bg-secondary-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="font-medium text-secondary-900">{req.patient_name}</div>
                            <div className="text-sm text-secondary-600">{req.units_required} unit(s)</div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="font-bold text-primary-600">{req.blood_group}</span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-secondary-900">{req.hospital_name}</div>
                            <div className="text-sm text-secondary-600">{req.city}</div>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                req.urgency === 'critical'
                                  ? 'bg-red-100 text-red-700'
                                  : req.urgency === 'urgent'
                                  ? 'bg-amber-100 text-amber-700'
                                  : 'bg-blue-100 text-blue-700'
                              }`}
                            >
                              {req.urgency.charAt(0).toUpperCase() + req.urgency.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                req.status === 'pending'
                                  ? 'bg-amber-100 text-amber-700'
                                  : req.status === 'fulfilled'
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-secondary-100 text-secondary-700'
                              }`}
                            >
                              {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              {req.status === 'pending' && (
                                <>
                                  <button
                                    onClick={() => updateRequestStatus(req.id, 'fulfilled')}
                                    className="p-1.5 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                                    title="Mark Fulfilled"
                                  >
                                    <CheckCircle className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => updateRequestStatus(req.id, 'cancelled')}
                                    className="p-1.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                                    title="Cancel"
                                  >
                                    <AlertCircle className="w-4 h-4" />
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'messages' && (
              <div className="bg-white rounded-2xl shadow-md overflow-hidden animate-fade-in">
                <div className="p-6 border-b border-secondary-200">
                  <h2 className="text-lg font-semibold text-secondary-900">Contact Messages</h2>
                </div>
                <div className="divide-y divide-secondary-100">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-6 hover:bg-secondary-50 transition-colors ${
                        !msg.is_read ? 'bg-primary-50/50' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-medium text-secondary-900">{msg.name}</span>
                            <span className="text-sm text-secondary-600">({msg.email})</span>
                            {!msg.is_read && (
                              <span className="px-2 py-0.5 bg-primary-100 text-primary-700 rounded-full text-xs">
                                New
                              </span>
                            )}
                          </div>
                          <div className="font-semibold text-secondary-900 mb-1">{msg.subject}</div>
                          <p className="text-secondary-600 text-sm">{msg.message}</p>
                          <div className="text-xs text-secondary-500 mt-2">
                            {new Date(msg.created_at).toLocaleString()}
                          </div>
                        </div>
                        {!msg.is_read && (
                          <button
                            onClick={() => markMessageRead(msg.id)}
                            className="p-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors"
                            title="Mark as Read"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
