import React, { useState } from 'react';
import { SAMPLE_ITINERARY } from '../data/mockData';
import { Itinerary, Activity, Expense } from '../types';
import { InteractiveMap } from './InteractiveMap';
import { 
  Plus, Sparkles, MapPin, Calendar, DollarSign, Users, Trash2, CheckCircle2, Circle, ExternalLink, Edit3, Share2
} from 'lucide-react';

interface ItineraryPlannerViewProps {
  currentItinerary?: Itinerary;
  onOpenAIGenerator: () => void;
}

export const ItineraryPlannerView: React.FC<ItineraryPlannerViewProps> = ({
  currentItinerary = SAMPLE_ITINERARY,
  onOpenAIGenerator
}) => {
  const [itinerary, setItinerary] = useState<Itinerary>(currentItinerary);
  const [activeDayNumber, setActiveDayNumber] = useState<number>(1);
  const [showAddActivityModal, setShowAddActivityModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  
  // New activity form states
  const [newTime, setNewTime] = useState('02:00 PM');
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<Activity['category']>('Sightseeing');
  const [newCost, setNewCost] = useState('$15');
  const [newLocation, setNewLocation] = useState('');
  const [newDesc, setNewDesc] = useState('');

  // Expenses state
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: 'exp-1', title: 'Shibuya Sky Tickets', amount: 36, paidBy: 'Alex', category: 'Sightseeing', date: '2026-10-12' },
    { id: 'exp-2', title: 'Ichiran Ramen Group Lunch', amount: 42, paidBy: 'Nadia', category: 'Dining', date: '2026-10-12' },
    { id: 'exp-3', title: 'Suica Transit Card Top-up', amount: 30, paidBy: 'Alex', category: 'Transport', date: '2026-10-13' },
  ]);

  const [friendName, setFriendName] = useState('Nadia');
  const [shareSuccess, setShareSuccess] = useState(false);

  const activeDay = itinerary.days.find((d) => d.dayNumber === activeDayNumber) || itinerary.days[0];

  // Map markers for active day
  const activeMarkers = activeDay ? activeDay.activities.map((a) => ({
    id: a.id,
    lat: a.lat,
    lng: a.lng,
    title: `${a.time} - ${a.title}`,
    subtitle: `${a.category} · ${a.cost}`,
    category: a.category
  })) : [];

  // Toggle activity complete
  const handleToggleComplete = (actId: string) => {
    const updatedDays = itinerary.days.map((d) => {
      if (d.dayNumber !== activeDayNumber) return d;
      return {
        ...d,
        activities: d.activities.map((a) => a.id === actId ? { ...a, isCompleted: !a.isCompleted } : a)
      };
    });
    setItinerary({ ...itinerary, days: updatedDays });
  };

  // Delete activity
  const handleDeleteActivity = (actId: string) => {
    const updatedDays = itinerary.days.map((d) => {
      if (d.dayNumber !== activeDayNumber) return d;
      return {
        ...d,
        activities: d.activities.filter((a) => a.id !== actId)
      };
    });
    setItinerary({ ...itinerary, days: updatedDays });
  };

  // Add custom activity
  const handleAddActivitySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    const newAct: Activity = {
      id: `act-custom-${Date.now()}`,
      time: newTime,
      title: newTitle,
      category: newCategory,
      cost: newCost,
      description: newDesc || 'Custom added place in itinerary.',
      location: newLocation || itinerary.destination,
      lat: 35.6762 + (Math.random() - 0.5) * 0.05,
      lng: 139.6503 + (Math.random() - 0.5) * 0.05,
      isCompleted: false
    };

    const updatedDays = itinerary.days.map((d) => {
      if (d.dayNumber !== activeDayNumber) return d;
      return {
        ...d,
        activities: [...d.activities, newAct]
      };
    });

    setItinerary({ ...itinerary, days: updatedDays });
    setShowAddActivityModal(false);
    setNewTitle('');
    setNewLocation('');
    setNewDesc('');
  };

  // Add new day
  const handleAddDay = () => {
    const nextDayNum = itinerary.days.length + 1;
    const newDayPlan = {
      dayNumber: nextDayNum,
      title: `Day ${nextDayNum}: Exploring More Spots`,
      activities: [
        {
          id: `act-day-${nextDayNum}-1`,
          time: '10:00 AM',
          title: `New Day ${nextDayNum} Morning Activity`,
          category: 'Sightseeing' as const,
          cost: '$10',
          description: 'Explore new neighborhood attractions.',
          location: itinerary.destination,
          lat: 35.6895,
          lng: 139.6917
        }
      ]
    };

    setItinerary({
      ...itinerary,
      daysCount: nextDayNum,
      days: [...itinerary.days, newDayPlan]
    });
    setActiveDayNumber(nextDayNum);
  };

  // Budget calculations
  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);
  const totalBudget = itinerary.totalBudget;
  const budgetPercentage = Math.min(100, Math.round((totalSpent / totalBudget) * 100));

  const handleShareTrip = () => {
    setShareSuccess(true);
    setTimeout(() => setShareSuccess(false), 2500);
  };
  return (
    <div className="w-full pt-28 pb-20 px-6 md:px-12 max-w-7xl mx-auto animate-in fade-in duration-300">
      
      {/* Trip Header Banner */}
      <div className="bg-[#161616] rounded-3xl p-8 border border-white/10 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-white">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-white/50 uppercase tracking-widest mb-2">
            <MapPin className="w-4 h-4 text-white" />
            <span>{itinerary.destination}</span>
            <span>·</span>
            <Calendar className="w-4 h-4 text-white" />
            <span>{itinerary.daysCount} DAYS ITINERARY</span>
          </div>

          <h1 className="font-['Plus_Jakarta_Sans'] text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
            {itinerary.title}
          </h1>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onOpenAIGenerator}
            className="px-5 py-2.5 bg-white/10 border border-white/20 hover:bg-white/20 text-white rounded-full font-black text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-white" />
            <span>AI Re-Optimize</span>
          </button>

          <button
            onClick={handleShareTrip}
            className="px-5 py-2.5 bg-[#161616] border border-white/20 hover:border-white text-white rounded-full font-black text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
          >
            <Share2 className="w-4 h-4 text-white" />
            <span>{shareSuccess ? 'Link Copied!' : 'Share Trip'}</span>
          </button>

          <button
            onClick={handleAddDay}
            className="px-5 py-2.5 bg-white text-black hover:bg-neutral-200 rounded-full font-black text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 text-black" />
            <span>Add Day</span>
          </button>
        </div>
      </div>

      {/* Budget & Expense Bar */}
      <div className="bg-[#161616] rounded-2xl p-5 border border-white/10 mb-8 flex flex-col md:flex-row items-center justify-between gap-4 text-white">
        <div className="flex items-center gap-3.5 w-full md:w-auto">
          <div className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center shrink-0 border border-white/20">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-mono font-bold text-white/50 tracking-widest uppercase">TRIP EXPENSE BUDGET</div>
            <div className="font-['Plus_Jakarta_Sans'] text-lg font-black text-white">
              ${totalSpent} <span className="text-xs font-mono font-normal text-white/50">/ ${totalBudget} USD spent</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full md:w-72 bg-[#222222] h-3 rounded-full overflow-hidden border border-white/10">
          <div
            className={`h-full transition-all duration-500 ${
              budgetPercentage > 90 ? 'bg-red-500' : 'bg-white'
            }`}
            style={{ width: `${budgetPercentage}%` }}
          />
        </div>

        <button
          onClick={() => setShowExpenseModal(true)}
          className="text-xs font-mono font-bold text-white/70 hover:text-white uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Users className="w-3.5 h-3.5" />
          <span>Split Costs ({expenses.length})</span>
        </button>
      </div>

      {/* Days Tabs */}
      <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-3 mb-8">
        {itinerary.days.map((day) => (
          <button
            key={day.dayNumber}
            onClick={() => setActiveDayNumber(day.dayNumber)}
            className={`px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
              activeDayNumber === day.dayNumber
                ? 'bg-white text-black font-black'
                : 'bg-[#161616] text-white/60 border border-white/10 hover:border-white/30'
            }`}
          >
            <span>Day {day.dayNumber}</span>
            <span className="text-[10px] opacity-60">({day.activities.length})</span>
          </button>
        ))}
      </div>

      {/* Main Split Layout: Timeline + Interactive Map */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Left: Activities Timeline */}
        <div className="flex-1 w-full space-y-4">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-['Plus_Jakarta_Sans'] font-black text-xl text-white uppercase tracking-tight">
              {activeDay?.title}
            </h2>
            <button
              onClick={() => setShowAddActivityModal(true)}
              className="px-4 py-2 bg-white text-black hover:bg-neutral-200 text-xs font-black uppercase tracking-wider rounded-full flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Activity</span>
            </button>
          </div>

          {activeDay?.activities.length === 0 ? (
            <div className="bg-[#161616] rounded-3xl p-10 text-center border border-white/10 text-white">
              <p className="text-sm font-['Space_Grotesk'] text-white/60 mb-4">No activities added for Day {activeDayNumber} yet.</p>
              <button
                onClick={() => setShowAddActivityModal(true)}
                className="px-6 py-2.5 bg-white text-black text-xs font-black uppercase tracking-wider rounded-full hover:bg-neutral-200"
              >
                + Add First Activity
              </button>
            </div>
          ) : (
            activeDay?.activities.map((act) => (
              <div
                key={act.id}
                className={`bg-[#161616] rounded-2xl p-6 border transition-all text-white ${
                  act.isCompleted
                    ? 'border-white/5 opacity-50'
                    : 'border-white/10 hover:border-white/30'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <button
                      onClick={() => handleToggleComplete(act.id)}
                      className="mt-0.5 text-white focus:outline-none cursor-pointer"
                    >
                      {act.isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 fill-white text-black" />
                      ) : (
                        <Circle className="w-5 h-5 text-white/30 hover:text-white" />
                      )}
                    </button>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-mono text-xs font-bold text-black bg-white px-2.5 py-0.5 rounded-md">
                          {act.time}
                        </span>
                        <span className="text-[10px] font-mono uppercase font-bold text-white/60 bg-white/10 px-2.5 py-0.5 rounded-md border border-white/10">
                          {act.category}
                        </span>
                        <span className="text-xs font-mono font-bold text-white/80">
                          {act.cost}
                        </span>
                      </div>

                      <h3 className={`font-['Plus_Jakarta_Sans'] font-black text-lg uppercase tracking-tight ${
                        act.isCompleted ? 'line-through text-white/40' : 'text-white'
                      }`}>
                        {act.title}
                      </h3>

                      <p className="text-xs font-['Space_Grotesk'] text-white/60 mt-1.5 leading-relaxed">
                        {act.description}
                      </p>

                      <div className="flex items-center gap-2 mt-3 text-xs font-['Space_Grotesk'] text-white/50">
                        <MapPin className="w-3.5 h-3.5 text-white/80" />
                        <span>{act.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Actions */}
                  <div className="flex items-center gap-2">
                    {act.bookingUrl && (
                      <a
                        href={act.bookingUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-mono uppercase font-bold flex items-center gap-1 transition-colors"
                        title="Book now"
                      >
                        <span>Book</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    <button
                      onClick={() => handleDeleteActivity(act.id)}
                      className="p-2 text-white/30 hover:text-red-400 rounded-lg transition-colors cursor-pointer"
                      title="Delete activity"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right: Interactive Map */}
        <div className="w-full lg:w-96 h-[500px] sticky top-24 rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-[#121212]">
          <InteractiveMap
            centerLat={activeMarkers.length > 0 ? activeMarkers[0].lat : 35.6762}
            centerLng={activeMarkers.length > 0 ? activeMarkers[0].lng : 139.6503}
            zoom={13}
            markers={activeMarkers}
            className="w-full h-full"
          />
        </div>

      </div>

      {/* Modal: Add Activity */}
      {showAddActivityModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#161616] rounded-3xl max-w-md w-full p-8 border border-white/20 shadow-2xl text-white animate-in zoom-in-95 duration-150">
            <h3 className="font-['Plus_Jakarta_Sans'] font-black text-xl uppercase tracking-tight text-white mb-4">
              ADD ACTIVITY TO DAY {activeDayNumber}
            </h3>

            <form onSubmit={handleAddActivitySubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase font-bold text-white/70 tracking-widest mb-1.5">Time</label>
                <input
                  type="text"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  placeholder="e.g. 02:30 PM"
                  className="w-full px-4 py-3 text-sm bg-[#222222] border border-white/20 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-white"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-white/70 tracking-widest mb-1.5">Activity Title *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Visit Senso-ji Temple"
                  className="w-full px-4 py-3 text-sm bg-[#222222] border border-white/20 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-white/70 tracking-widest mb-1.5">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-4 py-3 text-sm bg-[#222222] border border-white/20 rounded-xl text-white focus:outline-none focus:border-white"
                  >
                    <option value="Sightseeing">Sightseeing</option>
                    <option value="Dining">Dining</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Culture">Culture</option>
                    <option value="Transport">Transport</option>
                    <option value="Stay">Stay</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-white/70 tracking-widest mb-1.5">Estimated Cost</label>
                  <input
                    type="text"
                    value={newCost}
                    onChange={(e) => setNewCost(e.target.value)}
                    placeholder="e.g. $20"
                    className="w-full px-4 py-3 text-sm bg-[#222222] border border-white/20 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-white/70 tracking-widest mb-1.5">Location / Address</label>
                <input
                  type="text"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  placeholder="e.g. Asakusa, Taito City, Tokyo"
                  className="w-full px-4 py-3 text-sm bg-[#222222] border border-white/20 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-white"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-white/70 tracking-widest mb-1.5">Short Description</label>
                <textarea
                  rows={2}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Notes, tips or booking details..."
                  className="w-full px-4 py-3 text-sm bg-[#222222] border border-white/20 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-white"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddActivityModal(false)}
                  className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white/70 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-white text-black font-black text-xs uppercase tracking-wider rounded-full hover:bg-neutral-200 cursor-pointer"
                >
                  Save Activity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Expenses & Cost Splitter */}
      {showExpenseModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#161616] rounded-3xl max-w-lg w-full p-8 border border-white/20 shadow-2xl text-white animate-in zoom-in-95 duration-150">
            <h3 className="font-['Plus_Jakarta_Sans'] font-black text-xl uppercase tracking-tight text-white mb-1">
              TRIP EXPENSES & COST SPLITTER
            </h3>
            <p className="text-xs text-white/60 mb-6 font-['Space_Grotesk']">
              Track shared costs between group members seamlessly.
            </p>

            <div className="space-y-3 mb-6 max-h-56 overflow-y-auto pr-1">
              {expenses.map((e) => (
                <div key={e.id} className="p-4 bg-[#222222] border border-white/10 rounded-2xl flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-white uppercase">{e.title}</div>
                    <div className="text-[11px] font-mono text-white/50 mt-0.5">Paid by {e.paidBy} · {e.category}</div>
                  </div>
                  <div className="font-mono font-bold text-base text-white">${e.amount}</div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-white/10 border border-white/20 rounded-2xl mb-6 text-xs font-mono font-bold text-white flex items-center justify-between">
              <span>SPLIT EQUALLY (Alex & {friendName}):</span>
              <span>${(totalSpent / 2).toFixed(2)} / person</span>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setShowExpenseModal(false)}
                className="px-6 py-2.5 bg-white text-black font-black text-xs uppercase tracking-wider rounded-full hover:bg-neutral-200 cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
