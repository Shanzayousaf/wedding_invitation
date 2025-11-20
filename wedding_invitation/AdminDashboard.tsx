import { useState } from 'react';
import { ArrowLeft, Users, CheckCircle2, XCircle, Clock, Download, Search, Mail, Phone, ExternalLink } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { FloralDecoration } from './FloralDecoration';
import { mockGuests } from '../Data/mockData';
import { Guest } from '../Types/guest';

interface AdminDashboardProps {
  onNavigate: (page: 'home') => void;
}

export function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterEvent, setFilterEvent] = useState<string>('all');

  // Statistics
  const receptionGuests = mockGuests.filter(g => g.eventType === 'reception');
  const baratGuests = mockGuests.filter(g => g.eventType === 'barat');
  
  const stats = {
    total: mockGuests.length,
    reception: {
      total: receptionGuests.length,
      attending: receptionGuests.filter(g => g.rsvpStatus === 'attending').length,
      declined: receptionGuests.filter(g => g.rsvpStatus === 'declined').length,
      pending: receptionGuests.filter(g => g.rsvpStatus === 'pending').length,
      totalGuestCount: receptionGuests.filter(g => g.rsvpStatus === 'attending').reduce((sum, g) => sum + g.numberOfGuests, 0),
    },
    barat: {
      total: baratGuests.length,
      attending: baratGuests.filter(g => g.rsvpStatus === 'attending').length,
      declined: baratGuests.filter(g => g.rsvpStatus === 'declined').length,
      pending: baratGuests.filter(g => g.rsvpStatus === 'pending').length,
      totalGuestCount: baratGuests.filter(g => g.rsvpStatus === 'attending').reduce((sum, g) => sum + g.numberOfGuests, 0),
    },
  };

  // Filter guests
  const filteredGuests = mockGuests.filter(guest => {
    const matchesSearch = guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guest.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guest.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || guest.rsvpStatus === filterStatus;
    const matchesEvent = filterEvent === 'all' || guest.eventType === filterEvent;
    return matchesSearch && matchesStatus && matchesEvent;
  });

  const getRSVPIcon = (status: string) => {
    switch (status) {
      case 'attending': return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case 'declined': return <XCircle className="w-4 h-4 text-red-600" />;
      default: return <Clock className="w-4 h-4 text-yellow-600" />;
    }
  };

  const getRSVPBadge = (status: string) => {
    const variants = {
      attending: 'bg-green-100 text-green-700 border-green-200',
      declined: 'bg-red-100 text-red-700 border-red-200',
      pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    };
    return variants[status as keyof typeof variants] || variants.pending;
  };

  const handleExport = () => {
    // In a real app, this would export to CSV or integrate with Google Sheets
    const csv = [
      ['ID', 'Name', 'Email', 'Phone', 'Event', 'RSVP Status', 'Guests', 'Dietary', 'Message', 'Invitation Link'].join(','),
      ...filteredGuests.map(g => {
        const invitationUrl = `${window.location.origin}${window.location.pathname}#invitation/${g.id}`;
        return [g.id, g.name, g.email, g.phone, g.eventType, g.rsvpStatus, g.numberOfGuests, g.dietaryRestrictions || '', g.message || '', invitationUrl].join(',');
      })
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'guest-list.csv';
    a.click();
  };

  const getInvitationUrl = (guestId: string) => {
    return `${window.location.origin}${window.location.pathname}#invitation/${guestId}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ivory-50 via-blush-50 to-gold-50">
      <FloralDecoration position="top-left" color="text-blush-300" />
      <FloralDecoration position="bottom-right" color="text-gold-400" />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={() => onNavigate('home')}
            className="text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Home
          </Button>
          <Badge variant="outline" className="px-3 py-1">
            Admin Dashboard
          </Badge>
        </div>

        <div className="animate-fade-in">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl mb-2 text-gray-800">
              Guest Management
            </h1>
            <p className="text-gray-600">
              Manage RSVPs and track guest responses for both events
            </p>
          </div>

          {/* Statistics */}
          <Tabs defaultValue="overview" className="mb-8">
            <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="reception">Reception</TabsTrigger>
              <TabsTrigger value="barat">Barat</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid md:grid-cols-4 gap-4">
                <Card className="border-blush-200 shadow-lg">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm text-gray-600">Total Invitations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl text-gray-800">{stats.total}</p>
                  </CardContent>
                </Card>
                <Card className="border-green-200 shadow-lg bg-green-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm text-gray-600">Attending</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl text-green-700">
                      {stats.reception.attending + stats.barat.attending}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      {stats.reception.totalGuestCount + stats.barat.totalGuestCount} total guests
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-yellow-200 shadow-lg bg-yellow-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm text-gray-600">Pending</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl text-yellow-700">
                      {stats.reception.pending + stats.barat.pending}
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-red-200 shadow-lg bg-red-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm text-gray-600">Declined</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl text-red-700">
                      {stats.reception.declined + stats.barat.declined}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="reception" className="space-y-4">
              <div className="grid md:grid-cols-4 gap-4">
                <Card className="border-blush-200 shadow-lg bg-blush-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm text-gray-600">Total Invited</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl text-blush-700">{stats.reception.total}</p>
                  </CardContent>
                </Card>
                <Card className="border-green-200 shadow-lg bg-green-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm text-gray-600">Confirmed</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl text-green-700">{stats.reception.attending}</p>
                    <p className="text-xs text-gray-600 mt-1">
                      {stats.reception.totalGuestCount} guests
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-yellow-200 shadow-lg bg-yellow-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm text-gray-600">Awaiting</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl text-yellow-700">{stats.reception.pending}</p>
                  </CardContent>
                </Card>
                <Card className="border-red-200 shadow-lg bg-red-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm text-gray-600">Unable to Attend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl text-red-700">{stats.reception.declined}</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="barat" className="space-y-4">
              <div className="grid md:grid-cols-4 gap-4">
                <Card className="border-gold-300 shadow-lg bg-gold-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm text-gray-600">Total Invited</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl text-gold-700">{stats.barat.total}</p>
                  </CardContent>
                </Card>
                <Card className="border-green-200 shadow-lg bg-green-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm text-gray-600">Confirmed</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl text-green-700">{stats.barat.attending}</p>
                    <p className="text-xs text-gray-600 mt-1">
                      {stats.barat.totalGuestCount} guests
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-yellow-200 shadow-lg bg-yellow-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm text-gray-600">Awaiting</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl text-yellow-700">{stats.barat.pending}</p>
                  </CardContent>
                </Card>
                <Card className="border-red-200 shadow-lg bg-red-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm text-gray-600">Unable to Attend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl text-red-700">{stats.barat.declined}</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* Guest List */}
          <Card className="shadow-2xl border-2 border-gray-200">
            <CardHeader>
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <CardTitle className="text-2xl text-gray-800">Guest List</CardTitle>
                <Button
                  onClick={handleExport}
                  variant="outline"
                  className="border-2 border-gold-400 text-gold-700 hover:bg-gold-50"
                >
                  <Download className="mr-2 w-4 h-4" />
                  Export to CSV
                </Button>
              </div>

              {/* Filters */}
              <div className="grid md:grid-cols-3 gap-4 mt-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search by name, email, or ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterEvent} onValueChange={setFilterEvent}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by event" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Events</SelectItem>
                    <SelectItem value="reception">Reception Only</SelectItem>
                    <SelectItem value="barat">Barat Only</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="attending">Attending</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="declined">Declined</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>

            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Event</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Guests</TableHead>
                      <TableHead>Invitation Link</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredGuests.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center text-gray-500 py-8">
                          No guests found matching your filters
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredGuests.map((guest) => (
                        <TableRow key={guest.id} className="hover:bg-gray-50">
                          <TableCell className="font-mono text-sm">{guest.id}</TableCell>
                          <TableCell>{guest.name}</TableCell>
                          <TableCell>
                            <div className="space-y-1 text-sm">
                              <div className="flex items-center gap-1 text-gray-600">
                                <Mail className="w-3 h-3" />
                                <span className="text-xs">{guest.email}</span>
                              </div>
                              <div className="flex items-center gap-1 text-gray-600">
                                <Phone className="w-3 h-3" />
                                <span className="text-xs">{guest.phone}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={guest.eventType === 'reception' ? 'border-blush-300 text-blush-700' : 'border-gold-400 text-gold-700'}>
                              {guest.eventType}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={getRSVPBadge(guest.rsvpStatus)}>
                              <span className="flex items-center gap-1">
                                {getRSVPIcon(guest.rsvpStatus)}
                                {guest.rsvpStatus}
                              </span>
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4 text-gray-400" />
                              <span>{guest.numberOfGuests}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-blush-600 hover:text-blush-700"
                              onClick={() => window.open(getInvitationUrl(guest.id), '_blank')}
                            >
                              <ExternalLink className="w-4 h-4 mr-1" />
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Info Note */}
          <Card className="mt-6 border-blue-200 bg-blue-50">
            <CardContent className="p-6">
              <p className="text-sm text-gray-700 mb-3">
                <span className="font-semibold text-blue-700">Unique Invitation Links:</span> Each guest has a personalized URL that takes them directly to their invitation. 
                You can share these links via email, SMS, or any messaging platform. The CSV export includes all invitation URLs for easy bulk distribution.
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-semibold text-blue-700">Note:</span> In a production environment, this data would sync automatically with Google Sheets, 
                allowing you to manage guest information, send bulk emails with personalized links, and generate reports directly from your spreadsheet.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
