import { Service } from "../interface/model/Service";
export const SampleServiceData: Service = {
    id: "svc-001",
    name: "Community Health Clinic",
    alternateName: "CHC",
    description: "A health clinic providing primary and urgent care services.",
    url: "https://communityhealthclinic.org",
    additionalUrls: [],
    email: "contact@chc.org",
    status: "active",
    interpretationServices: "Available upon request",
    applicationProcess: "Apply online or visit in person.",
    feesDescription: "Sliding scale based on income.",
    waitTime: "Varies based on availability.",
    fees: "$10 - $50 per visit",
    accreditations: "Certified by the National Health Association",
    eligibilityDescription: "Open to all residents.",
    minimumAge: 18,
    maximumAge: 65,
    assuredDate: "2024-02-05",
    assurerEmail: "admin@chc.org",
    licenses: "State Medical License",
    alert: "Flu shots available now.",
    lastModified: "2025-02-05",
    phones: [
        {
            id: "phn-001",
            number: "+1-555-1234",
            extension: "101",
            type: "main",
            description: "Primary contact number",
            languages: [],
            attributes: [],
            metadata: []
        }
    ],
    schedules: [
        {
            id: "sch-001",
            validFrom: "2024-01-01",
            validTo: "2024-12-31",
            timezone: -5,
            unit: "hourly",
            count: 10,
            wkSt: "Monday",
            freq: "weekly",
            interval: 1,
            byDay: "Monday-Friday",
            byWeekNo: "",
            byMonthDay: "",
            byYearDay: "",
            description: "Clinic operating hours",
            opensAt: "08:00",
            closesAt: "18:00",
            scheduleLink: "",
            attendingType: "in-person",
            notes: "Closed on federal holidays.",
            attributes: [],
            metadata: []
        }
    ],
    serviceAreas: [
        {
            id: "area-001",
            name: "Downtown District",
            description: "Service available in downtown area.",
            extent: "",
            extentType: "",
            uri: "",
            attributes: [],
            metadata: []
        }
    ],
    serviceAtLocations: [
        {
            id: "loc-001",
            description: "Main clinic location.",
            servicesAreas: [
                {
                    id: "area-001",
                    name: "Downtown District",
                    description: "Service available in downtown area.",
                    extent: "",
                    extentType: "",
                    uri: "",
                    attributes: [],
                    metadata: []
                }
            ],
            contacts: [],
            phones: [],
            schedules: [],
            location: {
                id: "loc-001",
                locationType: "Clinic",
                url: "https://chc-location.org",
                name: "CHC Main Building",
                alternateName: "CHC Downtown",
                description: "The main healthcare facility for CHC.",
                transportation: "Accessible via public bus and subway.",
                latitude: 40.712776,
                longitude: -74.005974,
                externalIdentifier: "loc-ext-001",
                externalIdentifierType: "SystemXYZ",
                languages: [],
                addresses: [],
                contacts: [],
                accessibility: [],
                phones: [],
                schedules: [],
                attributes: [],
                metadata: []
            },
            attributes: [],
            metadata: []
        }
    ],
    languages: [
        {
            id: "lang-001",
            name: "English",
            code: "en",
            note: "Primary language",
            attributes: [],
            metadata: []
        }
    ],
    organization: {
        id: "org-001",
        name: "HealthCare Org",
        alternateName: "HCO",
        description: "A nonprofit healthcare provider.",
        email: "info@hco.org",
        website: "https://hco.org",
        additionalWebsites: [],
        taxStatus: "Nonprofit",
        taxId: "123456789",
        yearIncorporated: 1995,
        legalStatus: "501(c)(3)",
        logo: "",
        uri: "",
        parentOrganization: null,
        funding: [],
        contacts: [],
        phones: [],
        locations: [],
        organizationIdentifiers: [],
        attributes: [],
        metadata: []
    },
    funding: [],
    costOptions: [],
    program: null,
    requiredDocuments: [],
    contacts: [],
    capacities: [],
    attributes: [],
    metadata: []
};