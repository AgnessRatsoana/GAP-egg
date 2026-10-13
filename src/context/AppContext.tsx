import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Beneficiary,
  Property,
  Booking,
  ServiceProvider,
  ServiceRequest,
  WellbeingCheckin,
  ComfortRequest,
  SafetyAlert,
  Expense,
  Feedback,
  FollowUp,
  Message,
  PropertyIssue,
  UserRole,
  BeneficiaryStatus,
  PropertyVerificationStatus,
  ServiceRequestStatus,
  SafetyAlertStatus,
  ComfortStatus,
  PropertyIssueStatus,
  GetToKnowMe,
} from '../types';
import {
  initialBeneficiaries,
  initialProperties,
  initialBookings,
  initialServiceProviders,
  initialServiceRequests,
  initialCheckins,
  initialComfortRequests,
  initialSafetyAlerts,
  initialPropertyIssues,
  initialExpenses,
  initialFeedbacks,
  initialFollowUps,
  initialMessages,
} from '../data/mockData';

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  activeView: string;
  setActiveView: (view: string) => void;
  currentBeneficiaryId: string;
  setCurrentBeneficiaryId: (id: string) => void;

  beneficiaries: Beneficiary[];
  properties: Property[];
  bookings: Booking[];
  serviceProviders: ServiceProvider[];
  serviceRequests: ServiceRequest[];
  checkins: WellbeingCheckin[];
  comfortRequests: ComfortRequest[];
  safetyAlerts: SafetyAlert[];
  propertyIssues: PropertyIssue[];
  expenses: Expense[];
  feedbacks: Feedback[];
  followUps: FollowUp[];
  messages: Message[];

  // Current logged in entity helpers
  currentBeneficiary: Beneficiary | undefined;
  currentBeneficiaryCheckins: WellbeingCheckin[];
  currentBeneficiaryComfortRequests: ComfortRequest[];
  currentBeneficiaryServiceRequests: ServiceRequest[];
  currentBeneficiaryMessages: Message[];
  currentBeneficiaryBooking: Booking | undefined;
  currentBeneficiaryProperty: Property | undefined;

  // Actions
  addBeneficiary: (data: Partial<Beneficiary>) => Beneficiary;
  updateBeneficiaryStatus: (id: string, status: BeneficiaryStatus) => void;
  assignPropertyToBeneficiary: (
    beneficiaryId: string,
    propertyId: string,
    startDate?: string,
    endDate?: string
  ) => void;
  addProperty: (data: Partial<Property>) => Property;
  updatePropertyVerification: (
    propertyId: string,
    status: PropertyVerificationStatus,
    notes?: string
  ) => void;
  addServiceRequest: (data: Partial<ServiceRequest>) => ServiceRequest;
  updateServiceRequestStatus: (
    id: string,
    status: ServiceRequestStatus,
    providerId?: string,
    meetingLink?: string
  ) => void;
  addWellbeingCheckin: (data: Partial<WellbeingCheckin>) => WellbeingCheckin;
  triggerUrgentSafetyAlert: (beneficiaryId: string, message: string) => SafetyAlert;
  updateSafetyAlertStatus: (
    id: string,
    status: SafetyAlertStatus,
    actionTaken?: string
  ) => void;
  addComfortRequest: (data: Partial<ComfortRequest>) => ComfortRequest;
  updateComfortRequestStatus: (
    id: string,
    status: ComfortStatus,
    deliveryNote?: string
  ) => void;
  addExpense: (data: Partial<Expense>) => Expense;
  addFollowUp: (data: Partial<FollowUp>) => FollowUp;
  updateFollowUpStatus: (
    id: string,
    status: 'scheduled' | 'completed' | 'rescheduled' | 'missed'
  ) => void;
  addPropertyIssue: (data: Partial<PropertyIssue>) => PropertyIssue;
  updatePropertyIssueStatus: (id: string, status: PropertyIssueStatus) => void;
  sendMessage: (content: string, recipientRole?: 'beneficiary' | 'admin') => void;
  updateGetToKnowMe: (beneficiaryId: string, data: GetToKnowMe) => void;
  resetAllData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation & Role states
  const [role, setRoleState] = useState<UserRole>('public');
  const [activeView, setActiveView] = useState<string>('landing');
  const [currentBeneficiaryId, setCurrentBeneficiaryId] = useState<string>('ben-001');

  // Load from LocalStorage or initialize with mock data
  const loadInitial = <T,>(key: string, fallback: T): T => {
    try {
      const stored = localStorage.getItem(`gapamonth_v5_sa_${key}`);
      return stored ? JSON.parse(stored) : fallback;
    } catch {
      return fallback;
    }
  };

  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>(() =>
    loadInitial('beneficiaries', initialBeneficiaries)
  );
  const [properties, setProperties] = useState<Property[]>(() =>
    loadInitial('properties', initialProperties)
  );
  const [bookings, setBookings] = useState<Booking[]>(() =>
    loadInitial('bookings', initialBookings)
  );
  const [serviceProviders, setServiceProviders] = useState<ServiceProvider[]>(() =>
    loadInitial('serviceProviders', initialServiceProviders)
  );
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>(() =>
    loadInitial('serviceRequests', initialServiceRequests)
  );
  const [checkins, setCheckins] = useState<WellbeingCheckin[]>(() =>
    loadInitial('checkins', initialCheckins)
  );
  const [comfortRequests, setComfortRequests] = useState<ComfortRequest[]>(() =>
    loadInitial('comfortRequests', initialComfortRequests)
  );
  const [safetyAlerts, setSafetyAlerts] = useState<SafetyAlert[]>(() =>
    loadInitial('safetyAlerts', initialSafetyAlerts)
  );
  const [propertyIssues, setPropertyIssues] = useState<PropertyIssue[]>(() =>
    loadInitial('propertyIssues', initialPropertyIssues)
  );
  const [expenses, setExpenses] = useState<Expense[]>(() =>
    loadInitial('expenses', initialExpenses)
  );
  const [feedbacks, setFeedbacks] = useState<Feedback[]>(() =>
    loadInitial('feedbacks', initialFeedbacks)
  );
  const [followUps, setFollowUps] = useState<FollowUp[]>(() =>
    loadInitial('followUps', initialFollowUps)
  );
  const [messages, setMessages] = useState<Message[]>(() =>
    loadInitial('messages', initialMessages)
  );

  // Sync state to local storage
  useEffect(() => {
    try {
      localStorage.setItem('gapamonth_v5_sa_beneficiaries', JSON.stringify(beneficiaries));
      localStorage.setItem('gapamonth_v5_sa_properties', JSON.stringify(properties));
      localStorage.setItem('gapamonth_v5_sa_bookings', JSON.stringify(bookings));
      localStorage.setItem('gapamonth_v5_sa_serviceProviders', JSON.stringify(serviceProviders));
      localStorage.setItem('gapamonth_v5_sa_serviceRequests', JSON.stringify(serviceRequests));
      localStorage.setItem('gapamonth_v5_sa_checkins', JSON.stringify(checkins));
      localStorage.setItem('gapamonth_v5_sa_comfortRequests', JSON.stringify(comfortRequests));
      localStorage.setItem('gapamonth_v5_sa_safetyAlerts', JSON.stringify(safetyAlerts));
      localStorage.setItem('gapamonth_v5_sa_propertyIssues', JSON.stringify(propertyIssues));
      localStorage.setItem('gapamonth_v5_sa_expenses', JSON.stringify(expenses));
      localStorage.setItem('gapamonth_v5_sa_feedbacks', JSON.stringify(feedbacks));
      localStorage.setItem('gapamonth_v5_sa_followUps', JSON.stringify(followUps));
      localStorage.setItem('gapamonth_v5_sa_messages', JSON.stringify(messages));
    } catch {
      // storage quota or incognito fallback
    }
  }, [
    beneficiaries,
    properties,
    bookings,
    serviceProviders,
    serviceRequests,
    checkins,
    comfortRequests,
    safetyAlerts,
    propertyIssues,
    expenses,
    feedbacks,
    followUps,
    messages,
  ]);

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    if (newRole === 'public') {
      setActiveView('landing');
    } else if (newRole === 'beneficiary') {
      setActiveView('portal-dashboard');
    } else if (newRole === 'admin') {
      setActiveView('admin-overview');
    }
  };

  // Current Beneficiary Derived Records
  const currentBeneficiary = beneficiaries.find((b) => b.id === currentBeneficiaryId);
  const currentBeneficiaryCheckins = checkins
    .filter((c) => c.beneficiaryId === currentBeneficiaryId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const currentBeneficiaryComfortRequests = comfortRequests
    .filter((r) => r.beneficiaryId === currentBeneficiaryId)
    .sort((a, b) => new Date(b.requestedAt).getTime() - new Date(a.requestedAt).getTime());
  const currentBeneficiaryServiceRequests = serviceRequests
    .filter((r) => r.beneficiaryId === currentBeneficiaryId)
    .sort((a, b) => new Date(b.preferredDate).getTime() - new Date(a.preferredDate).getTime());
  const currentBeneficiaryMessages = messages.filter(
    (m) =>
      m.senderId === currentBeneficiaryId ||
      m.recipientId === currentBeneficiaryId ||
      m.conversationId === `conv-${currentBeneficiaryId}`
  );
  const currentBeneficiaryBooking = bookings.find(
    (bk) => bk.beneficiaryId === currentBeneficiaryId && (bk.status === 'active' || bk.status === 'confirmed')
  );
  const currentBeneficiaryProperty = properties.find(
    (p) => p.id === (currentBeneficiaryBooking?.propertyId || currentBeneficiary?.assignedPropertyId)
  );

  // Actions
  const addBeneficiary = (data: Partial<Beneficiary>): Beneficiary => {
    const newId = `ben-${Date.now().toString().slice(-4)}`;
    const newBen: Beneficiary = {
      id: newId,
      name: data.name || 'Anonymous Beneficiary',
      email: data.email || 'confidential@gapamonth.org',
      phone: data.phone || '',
      city: data.city || 'Western Cape, South Africa',
      dateOfBirth: data.dateOfBirth || '1990-01-01',
      emergencyContact: data.emergencyContact || {
        name: 'Designated Contact',
        relationship: 'Contact',
        phone: '',
      },
      status: 'submitted',
      circumstances: data.circumstances || 'Navigating significant life transition',
      narrative: data.narrative || '',
      urgencyLevel: data.urgencyLevel || 'standard',
      supportNeeded: data.supportNeeded || ['counselling', 'wellness'],
      accommodationPreferences: data.accommodationPreferences || {
        preferredLocation: 'Flexible peaceful location',
        accessibilityNeeds: 'None specified',
        petConsiderations: 'None',
        moveInDate: 'Flexible',
      },
      allocatedBudget: 3500,
      spentBudget: 0,
      createdAt: new Date().toISOString(),
      ...data,
    };

    setBeneficiaries((prev) => [newBen, ...prev]);
    return newBen;
  };

  const updateBeneficiaryStatus = (id: string, status: BeneficiaryStatus) => {
    setBeneficiaries((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b))
    );
  };

  const assignPropertyToBeneficiary = (
    beneficiaryId: string,
    propertyId: string,
    startDate: string = '2026-11-01',
    endDate: string = '2026-11-30'
  ) => {
    const beneficiary = beneficiaries.find((b) => b.id === beneficiaryId);
    const property = properties.find((p) => p.id === propertyId);
    if (!beneficiary || !property) return;

    const newBookingId = `book-${Date.now().toString().slice(-4)}`;
    const newBooking: Booking = {
      id: newBookingId,
      beneficiaryId,
      beneficiaryName: beneficiary.name,
      propertyId,
      propertyTitle: property.title,
      startDate,
      endDate,
      status: 'confirmed',
      notes: `Automated booking created upon assignment by Gap a Month Admin.`,
      createdAt: new Date().toISOString(),
    };

    setBookings((prev) => [newBooking, ...prev]);

    setBeneficiaries((prev) =>
      prev.map((b) =>
        b.id === beneficiaryId
          ? {
              ...b,
              status: 'booking_confirmed',
              assignedPropertyId: propertyId,
              assignedPropertyName: property.title,
              assignedBookingId: newBookingId,
              stayStartDate: startDate,
              stayEndDate: endDate,
            }
          : b
      )
    );

    setProperties((prev) =>
      prev.map((p) =>
        p.id === propertyId ? { ...p, currentBeneficiaryId: beneficiaryId } : p
      )
    );
  };

  const addProperty = (data: Partial<Property>): Property => {
    const newId = `prop-${Date.now().toString().slice(-4)}`;
    const newProp: Property = {
      id: newId,
      title: data.title || 'Peaceful Sanctuary Home',
      address: data.address || '',
      city: data.city || 'South Africa',
      propertyType: data.propertyType || 'cottage',
      bedrooms: data.bedrooms || 1,
      bathrooms: data.bathrooms || 1,
      verificationStatus: 'pending',
      availabilityStart: data.availabilityStart || '2026-11-01',
      availabilityEnd: data.availabilityEnd || '2027-04-30',
      amenities: data.amenities || ['Wi-Fi', 'Full Kitchen', 'Heating'],
      safetyFeatures: data.safetyFeatures || ['Smoke Detectors', 'Secure Lock'],
      houseRules: data.houseRules || ['Quiet hours 10pm-8am', 'No smoking'],
      ownerName: data.ownerName || 'Generous Host',
      ownerEmail: data.ownerEmail || '',
      ownerPhone: data.ownerPhone || '',
      photos: data.photos && data.photos.length > 0
        ? data.photos
        : ['https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=80'],
      description: data.description || 'A restful and quiet home offered for the Gap a Month programme.',
      createdAt: new Date().toISOString(),
      ...data,
    };

    setProperties((prev) => [newProp, ...prev]);
    return newProp;
  };

  const updatePropertyVerification = (
    propertyId: string,
    status: PropertyVerificationStatus,
    notes?: string
  ) => {
    setProperties((prev) =>
      prev.map((p) =>
        p.id === propertyId
          ? {
              ...p,
              verificationStatus: status,
              inspectionNotes: notes || p.inspectionNotes,
            }
          : p
      )
    );
  };

  const addServiceRequest = (data: Partial<ServiceRequest>): ServiceRequest => {
    const ben = currentBeneficiary || beneficiaries[0];
    const newId = `req-${Date.now().toString().slice(-4)}`;
    const newReq: ServiceRequest = {
      id: newId,
      beneficiaryId: ben.id,
      beneficiaryName: ben.name,
      serviceType: data.serviceType || 'counselling',
      preferredDate: data.preferredDate || new Date().toISOString().split('T')[0],
      preferredTime: data.preferredTime || '14:00',
      notes: data.notes || '',
      urgency: data.urgency || 'standard',
      status: 'pending',
      createdAt: new Date().toISOString(),
      ...data,
    };

    setServiceRequests((prev) => [newReq, ...prev]);
    return newReq;
  };

  const updateServiceRequestStatus = (
    id: string,
    status: ServiceRequestStatus,
    providerId?: string,
    meetingLink?: string
  ) => {
    const provider = providerId ? serviceProviders.find((p) => p.id === providerId) : undefined;
    setServiceRequests((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              status,
              ...(providerId ? { providerId, providerName: provider?.name } : {}),
              ...(meetingLink ? { meetingLink } : {}),
            }
          : r
      )
    );
  };

  const addWellbeingCheckin = (data: Partial<WellbeingCheckin>): WellbeingCheckin => {
    const ben = currentBeneficiary || beneficiaries[0];
    const newId = `chk-${Date.now().toString().slice(-4)}`;
    const newCheckin: WellbeingCheckin = {
      id: newId,
      beneficiaryId: ben.id,
      beneficiaryName: ben.name,
      date: new Date().toISOString().split('T')[0],
      mood: data.mood || 3,
      note: data.note || '',
      needsSupportCall: Boolean(data.needsSupportCall),
      safetyEscalated: Boolean(data.safetyEscalated),
      createdAt: new Date().toISOString(),
      ...data,
    };

    setCheckins((prev) => [newCheckin, ...prev]);

    // If support is needed, automatically alert the case manager
    if (newCheckin.needsSupportCall) {
      triggerUrgentSafetyAlert(
        ben.id,
        `Beneficiary requested a care check-in during daily reflection: "${newCheckin.note || 'Requested support call'}"`
      );
    }

    return newCheckin;
  };

  const triggerUrgentSafetyAlert = (beneficiaryId: string, message: string): SafetyAlert => {
    const ben = beneficiaries.find((b) => b.id === beneficiaryId);
    const newId = `alert-${Date.now().toString().slice(-4)}`;
    const newAlert: SafetyAlert = {
      id: newId,
      beneficiaryId,
      beneficiaryName: ben?.name || 'Beneficiary',
      propertyId: ben?.assignedPropertyId,
      propertyTitle: ben?.assignedPropertyName,
      severity: 'critical',
      status: 'open',
      message,
      createdAt: new Date().toISOString(),
    };

    setSafetyAlerts((prev) => [newAlert, ...prev]);
    return newAlert;
  };

  const updateSafetyAlertStatus = (
    id: string,
    status: SafetyAlertStatus,
    actionTaken?: string
  ) => {
    setSafetyAlerts((prev) =>
      prev.map((a) =>
        a.id === id
          ? {
              ...a,
              status,
              actionTaken: actionTaken || a.actionTaken,
              resolvedAt: status === 'resolved' ? new Date().toISOString() : a.resolvedAt,
            }
          : a
      )
    );
  };

  const addComfortRequest = (data: Partial<ComfortRequest>): ComfortRequest => {
    const ben = currentBeneficiary || beneficiaries[0];
    const newId = `comf-${Date.now().toString().slice(-4)}`;
    const newReq: ComfortRequest = {
      id: newId,
      beneficiaryId: ben.id,
      beneficiaryName: ben.name,
      category: data.category || 'food',
      title: data.title || 'Comfort Enhancement',
      details: data.details || '',
      status: 'submitted',
      requestedAt: new Date().toISOString(),
      ...data,
    };

    setComfortRequests((prev) => [newReq, ...prev]);
    return newReq;
  };

  const updateComfortRequestStatus = (
    id: string,
    status: ComfortStatus,
    deliveryNote?: string
  ) => {
    setComfortRequests((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              status,
              deliveryNote: deliveryNote || c.deliveryNote,
              fulfilledAt: status === 'fulfilled' ? new Date().toISOString() : c.fulfilledAt,
            }
          : c
      )
    );
  };

  const addExpense = (data: Partial<Expense>): Expense => {
    const ben = beneficiaries.find((b) => b.id === data.beneficiaryId) || beneficiaries[0];
    const newId = `exp-${Date.now().toString().slice(-4)}`;
    const newExp: Expense = {
      id: newId,
      beneficiaryId: ben.id,
      beneficiaryName: ben.name,
      category: data.category || 'incidentals',
      amount: data.amount || 50,
      description: data.description || 'Approved stay expenditure',
      receiptRef: data.receiptRef || `REC-${Date.now().toString().slice(-6)}`,
      date: data.date || new Date().toISOString().split('T')[0],
      approvedBy: data.approvedBy || 'Sarah Jenkins',
      ...data,
    };

    setExpenses((prev) => [newExp, ...prev]);

    // Update beneficiary spent budget
    setBeneficiaries((prev) =>
      prev.map((b) =>
        b.id === ben.id ? { ...b, spentBudget: (b.spentBudget || 0) + newExp.amount } : b
      )
    );

    return newExp;
  };

  const addFollowUp = (data: Partial<FollowUp>): FollowUp => {
    const ben = beneficiaries.find((b) => b.id === data.beneficiaryId) || beneficiaries[0];
    const newId = `fol-${Date.now().toString().slice(-4)}`;
    const newFol: FollowUp = {
      id: newId,
      beneficiaryId: ben.id,
      beneficiaryName: ben.name,
      milestone: data.milestone || '30_days',
      scheduledDate: data.scheduledDate || new Date().toISOString().split('T')[0],
      status: 'scheduled',
      notes: data.notes || 'Transition follow-up review',
      caseWorker: data.caseWorker || 'Sarah Jenkins',
      ...data,
    };

    setFollowUps((prev) => [newFol, ...prev]);
    return newFol;
  };

  const updateFollowUpStatus = (
    id: string,
    status: 'scheduled' | 'completed' | 'rescheduled' | 'missed'
  ) => {
    setFollowUps((prev) =>
      prev.map((f) => (f.id === id ? { ...f, status } : f))
    );
  };

  const addPropertyIssue = (data: Partial<PropertyIssue>): PropertyIssue => {
    const ben = currentBeneficiary || beneficiaries[0];
    const prop = currentBeneficiaryProperty || properties[0];
    const newId = `iss-${Date.now().toString().slice(-4)}`;
    const newIssue: PropertyIssue = {
      id: newId,
      propertyId: prop.id,
      propertyTitle: prop.title,
      beneficiaryId: ben.id,
      beneficiaryName: ben.name,
      issueType: data.issueType || 'other',
      description: data.description || '',
      urgency: data.urgency || 'medium',
      status: 'open',
      reportedDate: new Date().toISOString(),
      ...data,
    };

    setPropertyIssues((prev) => [newIssue, ...prev]);
    return newIssue;
  };

  const updatePropertyIssueStatus = (id: string, status: PropertyIssueStatus) => {
    setPropertyIssues((prev) =>
      prev.map((iss) =>
        iss.id === id
          ? {
              ...iss,
              status,
              resolvedDate: status === 'resolved' ? new Date().toISOString() : iss.resolvedDate,
            }
          : iss
      )
    );
  };

  const sendMessage = (content: string, recipientRole: 'beneficiary' | 'admin' = 'admin') => {
    const isBeneficiarySending = role === 'beneficiary';
    const ben = currentBeneficiary || beneficiaries[0];
    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      conversationId: `conv-${ben.id}`,
      senderId: isBeneficiarySending ? ben.id : 'admin-sarah',
      senderName: isBeneficiarySending ? ben.name : 'Sarah Jenkins (Care Lead)',
      senderRole: isBeneficiarySending ? 'beneficiary' : 'admin',
      recipientId: isBeneficiarySending ? 'admin-sarah' : ben.id,
      recipientRole,
      content,
      timestamp: new Date().toISOString(),
      read: false,
    };

    setMessages((prev) => [...prev, newMsg]);

    // If beneficiary sent a message, simulate a supportive automatic acknowledgement from Care Lead after 1.5s
    if (isBeneficiarySending) {
      setTimeout(() => {
        const autoReply: Message = {
          id: `msg-${Date.now() + 1}`,
          conversationId: `conv-${ben.id}`,
          senderId: 'admin-sarah',
          senderName: 'Sarah Jenkins (Care Lead)',
          senderRole: 'admin',
          recipientId: ben.id,
          recipientRole: 'beneficiary',
          content:
            'Thank you for reaching out, Amara. We have received your note and are reviewing it with your dedicated care circle right now. Please take gentle care.',
          timestamp: new Date().toISOString(),
          read: false,
        };
        setMessages((prev) => [...prev, autoReply]);
      }, 1200);
    }
  };

  const updateGetToKnowMe = (beneficiaryId: string, data: GetToKnowMe) => {
    setBeneficiaries((prev) =>
      prev.map((b) => (b.id === beneficiaryId ? { ...b, getToKnowMe: data } : b))
    );
  };

  const resetAllData = () => {
    localStorage.clear();
    setBeneficiaries(initialBeneficiaries);
    setProperties(initialProperties);
    setBookings(initialBookings);
    setServiceProviders(initialServiceProviders);
    setServiceRequests(initialServiceRequests);
    setCheckins(initialCheckins);
    setComfortRequests(initialComfortRequests);
    setSafetyAlerts(initialSafetyAlerts);
    setPropertyIssues(initialPropertyIssues);
    setExpenses(initialExpenses);
    setFeedbacks(initialFeedbacks);
    setFollowUps(initialFollowUps);
    setMessages(initialMessages);
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        activeView,
        setActiveView,
        currentBeneficiaryId,
        setCurrentBeneficiaryId,
        beneficiaries,
        properties,
        bookings,
        serviceProviders,
        serviceRequests,
        checkins,
        comfortRequests,
        safetyAlerts,
        propertyIssues,
        expenses,
        feedbacks,
        followUps,
        messages,
        currentBeneficiary,
        currentBeneficiaryCheckins,
        currentBeneficiaryComfortRequests,
        currentBeneficiaryServiceRequests,
        currentBeneficiaryMessages,
        currentBeneficiaryBooking,
        currentBeneficiaryProperty,
        addBeneficiary,
        updateBeneficiaryStatus,
        assignPropertyToBeneficiary,
        addProperty,
        updatePropertyVerification,
        addServiceRequest,
        updateServiceRequestStatus,
        addWellbeingCheckin,
        triggerUrgentSafetyAlert,
        updateSafetyAlertStatus,
        addComfortRequest,
        updateComfortRequestStatus,
        addExpense,
        addFollowUp,
        updateFollowUpStatus,
        addPropertyIssue,
        updatePropertyIssueStatus,
        sendMessage,
        updateGetToKnowMe,
        resetAllData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
