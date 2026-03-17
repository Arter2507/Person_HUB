import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Flame, CheckCircle, Star, Calendar, ChevronRight, NotebookText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import UserStatusBar from '../layout/UserStatusBar';

// Mock Data
const weeklyProgressData = [
  { name: 'Mon', tasks: 4 }, { name: 'Tue', tasks: 6 }, { name: 'Wed', tasks: 5 },
  { name: 'Thu', tasks: 8 }, { name: 'Fri', tasks: 7 }, { name: 'Sat', tasks: 10 },
  { name: 'Sun', tasks: 9 },
];

const taskBreakdownData = [
  { name: 'Study', value: 400 }, { name: 'Personal', value: 300 }, { name: 'Work', value: 300 },
];
const COLORS = ['hsl(var(--primary))', 'hsl(217.2 32.6% 17.5%)', 'hsl(215.4 16.3% 46.9%)'];

// --- Sub-components defined in the same file for encapsulation ---

const StatCard: React.FC<{ icon: React.ReactNode; title: string; value: string; colorClass: string }> = ({ icon, title, value, colorClass }) => (
    <Card>
        <CardContent className="p-4 flex items-center gap-4">
            <div className={`p-3 rounded-full bg-opacity-20 ${colorClass}`}>
                {icon}
            </div>
            <div>
                <p className="text-muted-foreground text-sm">{title}</p>
                <p className="text-2xl font-bold text-foreground">{value}</p>
            </div>
        </CardContent>
    </Card>
);

const WeeklyProgressChart: React.FC = () => (
    <Card>
        <CardHeader>
            <CardTitle>Weekly Progress</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={weeklyProgressData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', borderColor: 'hsl(var(--border))' }}/>
                    <Line type="monotone" dataKey="tasks" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
            </ResponsiveContainer>
        </CardContent>
    </Card>
);

const TaskBreakdownChart: React.FC = () => (
    <Card>
        <CardHeader>
             <CardTitle>Task Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
            <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                    <Pie data={taskBreakdownData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#8884d8" paddingAngle={5} dataKey="value">
                        {taskBreakdownData.map((_, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', borderColor: 'hsl(var(--border))' }}/>
                </PieChart>
            </ResponsiveContainer>
             <div className="flex justify-center gap-4 mt-4 text-sm">
                {taskBreakdownData.map((item, index) => (
                    <div key={item.name} className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }}></span>
                        <span className="text-muted-foreground">{item.name}</span>
                    </div>
                ))}
            </div>
        </CardContent>
    </Card>
);

const StudyGalleryWidget: React.FC = () => {
    const subjects = [
        { name: 'Quantum Physics', deadline: '3 days left', progress: 75, image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400' },
        { name: 'Astrobiology', deadline: '1 week left', progress: 40, image: 'https://images.unsplash.com/photo-1574901502283-4609a5c64c70?w=400' },
        { name: 'General Relativity', deadline: '2 weeks left', progress: 20, image: 'https://images.unsplash.com/photo-1614728263952-84ea256ec346?w=400' },
    ];
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle>Study Gallery</CardTitle>
                <Button variant="link" className="p-0 h-auto">View All <ChevronRight size={16} className="ml-1" /></Button>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {subjects.map(subject => (
                        <div key={subject.name} className="relative rounded-lg overflow-hidden group">
                            <img src={subject.image} alt={subject.name} className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-3 flex flex-col justify-end">
                                <h4 className="font-bold text-white">{subject.name}</h4>
                                <p className="text-xs text-slate-300 mb-2">{subject.deadline}</p>
                                <div className="w-full bg-slate-500/50 rounded-full h-1.5 overflow-hidden">
                                    <div className="bg-primary h-1.5" style={{ width: `${subject.progress}%` }}></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

const CalendarWidget: React.FC = () => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle>Calendar</CardTitle>
            <Calendar size={20} className="text-muted-foreground" />
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-7 text-center text-xs text-muted-foreground mb-2">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => <div key={day} className="font-bold">{day}</div>)}
            </div>
            <div className="grid grid-cols-7 text-center text-sm gap-y-1">
                {[...Array(31)].map((_, i) => (
                    <div key={i} className={`flex items-center justify-center h-8 w-8 rounded-full text-sm ${i + 1 === 18 ? 'bg-primary text-primary-foreground font-bold' : 'hover:bg-accent'}`}>
                        {i + 1}
                    </div>
                ))}
            </div>
        </CardContent>
    </Card>
);

const QuickNoteWidget: React.FC = () => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle>Quick Notes</CardTitle>
            <NotebookText size={20} className="text-muted-foreground" />
        </CardHeader>
        <CardContent>
            <ul className="space-y-3">
                {[
                    "Draft presentation slides", "Research black hole theories", "Schedule team meeting", "Buy groceries", "Water the Venus flytrap",
                ].map((note, i) => (
                    <li key={i} className="flex items-center gap-3">
                        <input type="checkbox" className="h-4 w-4 rounded border-border bg-transparent text-primary focus:ring-primary" />
                        <span className="text-muted-foreground">{note}</span>
                    </li>
                ))}
            </ul>
        </CardContent>
    </Card>
);

const Dashboard: React.FC = () => {
    return (
        <div className="flex flex-col gap-6">
            <UserStatusBar />
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <StatCard icon={<Flame size={24} className="text-orange-400" />} title="Streak" value="15 Days" colorClass="bg-orange-400/20" />
                    <StatCard icon={<CheckCircle size={24} className="text-green-400" />} title="Tasks Completed" value="128" colorClass="bg-green-400/20" />
                    <StatCard icon={<Star size={24} className="text-yellow-400" />} title="XP Points" value="1,500 XP" colorClass="bg-yellow-400/20" />
                </div>
                <div className="col-span-12 lg:col-span-8 grid grid-cols-1 gap-6">
                    <WeeklyProgressChart />
                    <StudyGalleryWidget />
                </div>
                <div className="col-span-12 lg:col-span-4 grid grid-cols-1 gap-6 content-start">
                    <TaskBreakdownChart />
                    <CalendarWidget />
                    <QuickNoteWidget />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
