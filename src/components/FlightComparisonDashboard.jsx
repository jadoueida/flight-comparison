import React from 'react';
import { Clock, Plane } from 'lucide-react';

// Flight data sorted by departure date
const flights = [

    {
        id: 2,
        airline: 'Air France',
        operatedBy: 'MEA',
        price: 1527,
        departure: '2024-12-23T23:30',
        arrival: '2024-12-24T23:30',
        totalDuration: '17h',
        flightNumbers: ['AF387', 'ME230'],
        bookingUrl: 'https://www.skyscanner.net/transport/flights/yyz/bey/241223/config/18467-2412232330--32677,-32062-1-9834-2412242330?adultsv2=1&cabinclass=economy&childrenv2=&inboundaltsenabled=false&outboundaltsenabled=false&preferdirects=false&rtn=0',
        stops: [
            {
                city: 'Paris',
                airport: 'CDG',
                duration: '5h 05m',
                warning: 'Long wait'
            }
        ]
    },
    {
        id: 3,
        airline: 'Lufthansa',
        operatedBy: 'Air Canada',
        price: 1619,
        departure: '2024-12-23T20:40',
        arrival: '2024-12-24T18:55',
        totalDuration: '15h 15m',
        flightNumbers: ['LH6825', 'ME212'],
        bookingUrl: 'https://www.skyscanner.net/transport/flights/yyz/bey/241223/config/18467-2412232040--32090,-32062-1-9834-2412241855?adultsv2=1&cabinclass=economy&childrenv2=&inboundaltsenabled=false&outboundaltsenabled=false&preferdirects=false&rtn=0',
        stops: [
            {
                city: 'Paris',
                airport: 'CDG',
                duration: '3h 15m',
                warning: 'Long wait'
            }
        ]
    },

];

const FlightCard = ({ flight }) => {
    const formatTime = (dateString) => {
        return new Date(dateString).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        }).toUpperCase();
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="bg-white rounded-lg p-6 shadow-sm">
            {/* Header with airline info and booking button */}
            <div className="flex justify-between items-start mb-8">
                <div className="flex items-start gap-3">
                    <div className="bg-blue-50 rounded-full p-2.5">
                        <Plane className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">{flight.airline}</h3>
                        <p className="text-gray-500 text-sm">
                            {flight.flightNumbers.join(' / ')}
                            {flight.operatedBy && ` • Operated by ${flight.operatedBy}`}
                        </p>
                    </div>
                </div>
                <button
                    className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors text-sm font-medium"
                    onClick={() => window.open(flight.bookingUrl, '_blank')}
                >
                    Book Flight
                </button>
            </div>

            {/* Flight timeline */}
            <div className="relative pl-3">
                {/* Timeline line */}
                <div className="absolute left-[5px] top-0 bottom-0 w-px bg-gray-200" />

                {/* Departure */}
                <div className="relative mb-6">
                    <div className="absolute left-0 w-2.5 h-2.5 rounded-full bg-blue-500 mt-2" />
                    <div className="ml-6">
                        <div className="text-lg font-medium">{formatTime(flight.departure)}</div>
                        <div className="text-gray-500">{formatDate(flight.departure)}</div>
                        <div className="text-gray-700 mt-0.5">Toronto (YYZ)</div>
                    </div>
                </div>

                {/* Stops */}
                {flight.stops.map((stop, index) => (
                    <div key={index} className="relative mb-6">
                        <div className="absolute left-0 w-2.5 h-2.5 rounded-full bg-gray-300 mt-2" />
                        <div className="ml-6">
                            <div className="text-lg font-medium">{stop.city}</div>
                            <div className="bg-red-50 rounded p-2 mt-1">
                                <div className="text-red-600">Layover: {stop.duration}</div>
                                {stop.warning && (
                                    <div className="text-red-500 text-sm mt-1">{stop.warning}</div>
                                )}
                            </div>
                            <div className="flex items-center gap-1 text-gray-500 mt-2 text-sm">
                                <Clock className="w-4 h-4" />
                                <span>Connection time</span>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Arrival */}
                <div className="relative">
                    <div className="absolute left-0 w-2.5 h-2.5 rounded-full bg-blue-500 mt-2" />
                    <div className="ml-6">
                        <div className="text-lg font-medium">{formatTime(flight.arrival)}</div>
                        <div className="text-gray-500">{formatDate(flight.arrival)}</div>
                        <div className="text-gray-700 mt-0.5">Beirut (BEY)</div>
                    </div>
                </div>
            </div>

            {/* Flight summary */}
            <div className="flex gap-6 mt-6 text-gray-600 text-sm">
                <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Total duration: {flight.totalDuration}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Plane className="w-4 h-4" />
                    <span>{flight.stops.length} {flight.stops.length === 1 ? 'stop' : 'stops'}</span>
                </div>
            </div>
        </div>
    );
};

const FlightComparisonDashboard = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold mb-2">YYZ → BEY Tootsie</h1>
                    <p className="text-gray-600">Toronto to Beirut • Dec 22 - Dec 24</p>
                </div>

                {/* Flight cards */}
                <div className="space-y-4">
                    {flights.map((flight) => (
                        <FlightCard
                            key={flight.id}
                            flight={flight}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FlightComparisonDashboard;