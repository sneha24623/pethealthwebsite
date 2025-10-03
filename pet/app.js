// Pet Healthcare Website JavaScript - Dogs & Cats Only

class PetHealthcareApp {
  constructor() {
    this.currentPage = 'home';
    this.currentPet = 'buddy';
    this.activityChart = null;
    
    this.doctorsData = {
      "dr_smith": {
        "name": "Dr. Sarah Smith",
        "specialty": "General Veterinarian", 
        "experience": "8 years",
        "availability": ["Monday", "Tuesday", "Wednesday", "Friday"]
      },
      "dr_johnson": {
        "name": "Dr. Michael Johnson", 
        "specialty": "Veterinary Surgeon",
        "experience": "12 years",
        "availability": ["Tuesday", "Wednesday", "Thursday", "Friday"]
      },
      "dr_brown": {
        "name": "Dr. Emily Brown",
        "specialty": "Dog & Cat Specialist",
        "experience": "6 years", 
        "availability": ["Monday", "Wednesday", "Thursday", "Saturday"]
      },
      "dr_davis": {
        "name": "Dr. James Davis",
        "specialty": "Emergency Care Specialist", 
        "experience": "10 years",
        "availability": ["Available 24/7"]
      }
    };

    // Pet breed data
    this.dogBreeds = [
      "Golden Retriever", "Labrador Retriever", "German Shepherd", "Bulldog", 
      "Beagle", "Poodle", "Rottweiler", "Yorkshire Terrier", "Boxer", "Siberian Husky",
      "Chihuahua", "Border Collie", "Australian Shepherd", "Dachshund", "Mixed Breed"
    ];

    this.catBreeds = [
      "Persian", "Siamese", "Maine Coon", "British Shorthair", "Ragdoll", 
      "Bengal", "Russian Blue", "Abyssinian", "Scottish Fold", "Sphynx",
      "American Shorthair", "Norwegian Forest", "Turkish Angora", "Mixed Breed"
    ];

    this.dogSizes = ["Small (under 25 lbs)", "Medium (25-60 lbs)", "Large (60-90 lbs)", "Extra Large (over 90 lbs)"];
    this.catTypes = ["Indoor Only", "Outdoor Access", "Indoor/Outdoor"];

    // Pet profile images
    this.defaultPetImages = {
      "Dog": [
        {
          "name": "Golden Retriever",
          "image": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRkZEQjAwIi8+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNDAiIHI9IjIwIiBmaWxsPSIjRkY4QzAwIi8+CjxjaXJjbGUgY3g9IjQzIiBjeT0iMzUiIHI9IjMiIGZpbGw9IiMwMDAiLz4KPGNpcmNsZSBjeD0iNTciIGN5PSIzNSIgcj0iMyIgZmlsbD0iIzAwMCIvPgo8ZWxsaXBzZSBjeD0iNTAiIGN5PSI0NSIgcng9IjQiIHJ5PSIyIiBmaWxsPSIjMDAwIi8+Cjwvc3ZnPgo="
        },
        {
          "name": "German Shepherd",
          "image": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjOEI0NTEzIi8+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNDAiIHI9IjIwIiBmaWxsPSIjNjUzNjExIi8+CjxjaXJjbGUgY3g9IjQzIiBjeT0iMzUiIHI9IjMiIGZpbGw9IiMwMDAiLz4KPGNpcmNsZSBjeD0iNTciIGN5PSIzNSIgcj0iMyIgZmlsbD0iIzAwMCIvPgo8ZWxsaXBzZSBjeD0iNTAiIGN5PSI0NSIgcng9IjQiIHJ5PSIyIiBmaWxsPSIjMDAwIi8+Cjwvc3ZnPgo="
        },
        {
          "name": "Beagle",
          "image": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRDJ2OTFCIi8+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNDAiIHI9IjE4IiBmaWxsPSIjQjQ1RjA2Ii8+CjxjaXJjbGUgY3g9IjQzIiBjeT0iMzUiIHI9IjMiIGZpbGw9IiMwMDAiLz4KPGNpcmNsZSBjeD0iNTciIGN5PSIzNSIgcj0iMyIgZmlsbD0iIzAwMCIvPgo8ZWxsaXBzZSBjeD0iNTAiIGN5PSI0NSIgcng9IjQiIHJ5PSIyIiBmaWxsPSIjMDAwIi8+Cjwvc3ZnPgo="
        }
      ],
      "Cat": [
        {
          "name": "Tabby Cat",
          "image": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjQ0M5OTk5Ii8+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNDUiIHI9IjE4IiBmaWxsPSIjQUE3NzY2Ci8+Cjxwb2x5Z29uIHBvaW50cz0iMzUsMzAgNDAsMjAgNDUsMzAiIGZpbGw9IiNBQTc3NjYiLz4KPHBvbHlnb24gcG9pbnRzPSI1NSwzMCA2MCwyMCA2NSwzMCIgZmlsbD0iI0FBNzc2NiIvPgo8Y2lyY2xlIGN4PSI0NSIgY3k9IjQyIiByPSIyIiBmaWxsPSIjMDA3NzAwIi8+CjxjaXJjbGUgY3g9IjU1IiBjeT0iNDIiIHI9IjIiIGZpbGw9IiMwMDc3MDAiLz4KPC9zdmc+"
        },
        {
          "name": "Persian Cat",
          "image": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNDUiIHI9IjE4IiBmaWxsPSIjRTBFMEUwIi8+Cjxwb2x5Z29uIHBvaW50cz0iMzUsMzAgNDAsMjAgNDUsMzAiIGZpbGw9IiNFMEUwRTAiLz4KPHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjVGNUY1Ci8+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNDUiIHI9IjE4IiBmaWxsPSIjRTBFMEUwIi8+Cjxwb2x5Z29uIHBvaW50cz0iMzUsMzAgNDAsMjAgNDUsMzAiIGZpbGw9IiNFMEUwRTAiLz4KPC9zdmc+"
        },
        {
          "name": "Siamese Cat",
          "image": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRkZGOEVGIi8+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNDUiIHI9IjE4IiBmaWxsPSIjRjBFNkRBIi8+Cjxwb2x5Z29uIHBvaW50cz0iMzUsMzAgNDAsMjAgNDUsMzAiIGZpbGw9IiM4QjQ1MTMiLz4KPHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRkZGOEVGCi8+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNDUiIHI9IjE4IiBmaWxsPSIjRjBFNkRBCi8+Cjxwb2x5Z29uIHBvaW50cz0iMzUsMzAgNDAsMjAgNDUsMzAiIGZpbGw9IiM4QjQ1MTMiLz4KPC9zdmc+"
        }
      ]
    };
    
    this.petHealthData = {
      "buddy": {
        "name": "Buddy",
        "type": "Dog",
        "breed": "Golden Retriever",
        "age": 3,
        "weight": 28.5,
        "size": "Medium (25-60 lbs)",
        "image": this.defaultPetImages.Dog[0].image,
        "healthMetrics": {
          "activity": 75,
          "sleep": 82,
          "wellness": 68
        },
        "vitalSigns": {
          "heartRate": { "value": 95, "unit": "BPM", "status": "Normal" },
          "temperature": { "value": 101.5, "unit": "°F", "status": "Normal" },
          "weight": { "value": 28.5, "unit": "lbs", "change": "+0.5", "status": "Stable" }
        },
        "activityData": [65, 72, 80, 75, 85, 90, 75],
        "lastCheckup": "2024-09-15",
        "nextAppointment": "2025-01-15"
      },
      "whiskers": {
        "name": "Whiskers",
        "type": "Cat",
        "breed": "Persian",
        "age": 5,
        "weight": 12.3,
        "catType": "Indoor Only",
        "image": this.defaultPetImages.Cat[1].image,
        "healthMetrics": {
          "activity": 60,
          "sleep": 90,
          "wellness": 85
        },
        "vitalSigns": {
          "heartRate": { "value": 180, "unit": "BPM", "status": "Normal" },
          "temperature": { "value": 101.2, "unit": "°F", "status": "Normal" },
          "weight": { "value": 12.3, "unit": "lbs", "change": "-0.2", "status": "Stable" }
        },
        "activityData": [55, 60, 65, 58, 62, 70, 60],
        "lastCheckup": "2024-08-20",
        "nextAppointment": "2025-02-20"
      },
      "max": {
        "name": "Max",
        "type": "Dog",
        "breed": "German Shepherd",
        "age": 6,
        "weight": 35.8,
        "size": "Large (60-90 lbs)",
        "image": this.defaultPetImages.Dog[1].image,
        "healthMetrics": {
          "activity": 85,
          "sleep": 75,
          "wellness": 90
        },
        "vitalSigns": {
          "heartRate": { "value": 88, "unit": "BPM", "status": "Normal" },
          "temperature": { "value": 101.8, "unit": "°F", "status": "Normal" },
          "weight": { "value": 35.8, "unit": "lbs", "change": "+1.2", "status": "Gaining" }
        },
        "activityData": [80, 85, 90, 88, 92, 95, 85],
        "lastCheckup": "2024-10-01",
        "nextAppointment": "2025-01-01"
      }
    };
    
    this.dangerousFoods = {
      "Dog": [
        "Chocolate (contains theobromine - toxic)",
        "Grapes and raisins (cause kidney failure)", 
        "Onions and garlic (damage red blood cells)",
        "Xylitol artificial sweetener (causes hypoglycemia)",
        "Alcohol (causes intoxication, coma, death)",
        "Caffeine (causes hyperactivity, seizures)",
        "Cooked bones (splinter and cause blockages)",
        "Avocado (contains persin - toxic)",
        "Macadamia nuts (cause weakness, tremors)",
        "Yeast dough (expands in stomach)"
      ],
      "Cat": [
        "Chocolate (toxic theobromine)",
        "Onions and garlic (damage red blood cells)",
        "Grapes and raisins (kidney failure)",
        "Alcohol (toxic to cats)",
        "Caffeine (overstimulation, seizures)", 
        "Tuna in excess (mercury poisoning)",
        "Milk (lactose intolerance in most cats)",
        "Raw fish (thiamine deficiency)",
        "Fat trimmings (pancreatitis)",
        "Cooked bones (choking hazard)"
      ]
    };

    this.nutritionGuidelines = {
      "Dog": {
        "puppyCaloriesPerPound": 55,
        "adultCaloriesPerPound": 35,
        "seniorCaloriesPerPound": 30,
        "proteinRequirement": "22-25%",
        "fatRequirement": "8-15%",
        "mealFrequency": {"puppy": 3, "adult": 2, "senior": 2}
      },
      "Cat": {
        "kittenCaloriesPerPound": 50,
        "adultCaloriesPerPound": 30,
        "seniorCaloriesPerPound": 25,
        "proteinRequirement": "32-40%",
        "fatRequirement": "10-15%",
        "mealFrequency": {"kitten": 4, "adult": 2, "senior": 2},
        "specialNotes": "Obligate carnivore - requires taurine, arachidonic acid, and vitamin A from animal sources"
      }
    };
    
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.showPage('home');
    this.setMinDate();
  }

  setupEventListeners() {
    // Navigation event listeners
    document.addEventListener('click', (e) => {
      if (e.target.hasAttribute('data-page')) {
        e.preventDefault();
        const page = e.target.getAttribute('data-page');
        this.showPage(page);
      }
    });

    // Form submissions
    this.setupFormHandlers();
    
    // Modal handlers
    this.setupModalHandlers();

    // Real-time form validation
    this.setupFormValidation();

    // Dashboard specific handlers
    this.setupDashboardHandlers();

    // Pet type change handlers - Setup after DOM is loaded
    this.setupPetTypeHandlers();
  }

  setupPetTypeHandlers() {
    // Use a timeout to ensure DOM elements are ready
    setTimeout(() => {
      // Adoption form pet type change
      const adoptPetType = document.getElementById('adoptPetType');
      if (adoptPetType) {
        adoptPetType.addEventListener('change', (e) => {
          this.updateAdoptionBreedOptions(e.target.value);
        });
      }

      // Diet planner pet type change
      const dietPetType = document.getElementById('dietPetType');
      if (dietPetType) {
        dietPetType.addEventListener('change', (e) => {
          this.updateDietBreedOptions(e.target.value);
        });
      }
    }, 100);
  }

  updateAdoptionBreedOptions(petType) {
    const breedSelect = document.getElementById('adoptPetBreed');
    const dogSizeRow = document.getElementById('dogSizeRow');
    const catTypeRow = document.getElementById('catTypeRow');
    
    if (!breedSelect) return;

    // Clear current options
    breedSelect.innerHTML = '<option value="">Select breed...</option>';
    
    // Hide both size/type rows initially
    if (dogSizeRow) dogSizeRow.classList.remove('show');
    if (catTypeRow) catTypeRow.classList.remove('show');
    
    if (petType === 'Dog') {
      this.dogBreeds.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed;
        option.textContent = breed;
        breedSelect.appendChild(option);
      });
      if (dogSizeRow) dogSizeRow.classList.add('show');
    } else if (petType === 'Cat') {
      this.catBreeds.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed;
        option.textContent = breed;
        breedSelect.appendChild(option);
      });
      if (catTypeRow) catTypeRow.classList.add('show');
    } else {
      // Reset to default when no pet type is selected
      breedSelect.innerHTML = '<option value="">First select pet type...</option>';
    }
  }

  updateDietBreedOptions(petType) {
    const breedSelect = document.getElementById('dietPetBreed');
    
    if (!breedSelect) return;

    // Clear current options
    breedSelect.innerHTML = '<option value="">Select breed...</option>';
    
    if (petType === 'Dog') {
      this.dogBreeds.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed;
        option.textContent = breed;
        breedSelect.appendChild(option);
      });
    } else if (petType === 'Cat') {
      this.catBreeds.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed;
        option.textContent = breed;
        breedSelect.appendChild(option);
      });
    } else {
      // Reset to default when no pet type is selected
      breedSelect.innerHTML = '<option value="">First select pet type...</option>';
    }
  }

  setupDashboardHandlers() {
    // Pet selector change
    const petSelect = document.getElementById('petSelect');
    if (petSelect) {
      petSelect.addEventListener('change', (e) => {
        this.currentPet = e.target.value;
        this.updateDashboard();
      });
    }

    // Alert action buttons
    document.addEventListener('click', (e) => {
      if (e.target.textContent === 'Schedule') {
        this.showModal(
          'Appointment Scheduled',
          'Your vaccination appointment has been scheduled.',
          '<p><strong>Next steps:</strong> You will receive a confirmation email shortly.</p>'
        );
      }
      
      if (e.target.textContent === 'Mark Given') {
        this.showModal(
          'Medication Recorded',
          'Morning medication has been marked as given.',
          '<p><strong>Time:</strong> ' + new Date().toLocaleTimeString() + '</p>'
        );
      }
    });
  }

  setupFormHandlers() {
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => this.handleLogin(e));
    }

    // Signup form
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
      signupForm.addEventListener('submit', (e) => this.handleSignup(e));
    }

    // Appointment form
    const appointmentForm = document.getElementById('appointmentForm');
    if (appointmentForm) {
      appointmentForm.addEventListener('submit', (e) => this.handleAppointment(e));
    }

    // Adoption pet form
    const adoptionPetForm = document.getElementById('adoptionPetForm');
    if (adoptionPetForm) {
      adoptionPetForm.addEventListener('submit', (e) => this.handleAdoptionPet(e));
    }

    // Adopter form
    const adopterForm = document.getElementById('adopterForm');
    if (adopterForm) {
      adopterForm.addEventListener('submit', (e) => this.handleAdopter(e));
    }

    // Diet planner form
    const dietForm = document.getElementById('dietPlannerForm');
    if (dietForm) {
      dietForm.addEventListener('submit', (e) => this.handleDietPlanner(e));
    }
  }

  setupModalHandlers() {
    const modalClose = document.getElementById('modalClose');
    const modal = document.getElementById('successModal');
    
    if (modalClose) {
      modalClose.addEventListener('click', () => {
        this.closeModal();
      });
    }

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('modal__overlay')) {
          this.closeModal();
        }
      });
    }
  }

  setMinDate() {
    const dateInput = document.getElementById('appointmentDate');
    if (dateInput) {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const minDate = tomorrow.toISOString().split('T')[0];
      dateInput.setAttribute('min', minDate);
    }
  }

  showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
      page.classList.remove('page--active');
    });

    // Show selected page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
      targetPage.classList.add('page--active');
      this.currentPage = pageId;
    }

    // Initialize dashboard if showing dashboard page
    if (pageId === 'dashboard') {
      setTimeout(() => {
        this.initializeDashboard();
      }, 100);
    }

    // Setup pet type handlers when showing adoption or diet planner pages
    if (pageId === 'adoption' || pageId === 'diet-planner') {
      setTimeout(() => {
        this.setupPetTypeHandlers();
      }, 100);
    }

    // Update navigation active states
    this.updateNavigationState(pageId);

    // Scroll to top
    window.scrollTo(0, 0);
  }

  initializeDashboard() {
    this.updateDashboard();
    this.initializeChart();
  }

  updateDashboard() {
    const petData = this.petHealthData[this.currentPet];
    if (!petData) return;

    // Update pet profile
    this.updatePetProfile(petData);

    // Update health cards
    this.updateHealthCards(petData.healthMetrics);
    
    // Update vital signs
    this.updateVitalSigns(petData.vitalSigns);
    
    // Update chart
    this.updateChart(petData.activityData);
  }

  updatePetProfile(petData) {
    const profileName = document.getElementById('petProfileName');
    const profileBreed = document.getElementById('petProfileBreed');
    const profileAge = document.getElementById('petProfileAge');
    const profileWeight = document.getElementById('petProfileWeight');
    const petImage = document.getElementById('currentPetImage');

    if (profileName) profileName.textContent = petData.name;
    if (profileBreed) profileBreed.textContent = petData.breed;
    if (profileAge) profileAge.textContent = `${petData.age} years old`;
    if (profileWeight) profileWeight.textContent = `${petData.weight} lbs`;
    
    if (petImage && petData.image) {
      petImage.innerHTML = `<img src="${petData.image}" alt="${petData.name}" />`;
    }
  }

  updateHealthCards(metrics) {
    const healthCards = document.querySelectorAll('.health-card');
    
    healthCards.forEach((card, index) => {
      const value = card.querySelector('.health-card__value');
      const progressFill = card.querySelector('.progress-fill');
      const status = card.querySelector('.health-card__status');
      
      let metricKey, metricValue, metricStatus;
      
      switch(index) {
        case 0:
          metricKey = 'activity';
          metricValue = metrics.activity;
          metricStatus = metricValue >= 70 ? 'Good' : metricValue >= 50 ? 'Fair' : 'Low';
          break;
        case 1:
          metricKey = 'sleep';
          metricValue = metrics.sleep;
          metricStatus = metricValue >= 80 ? 'Excellent' : metricValue >= 60 ? 'Good' : 'Poor';
          break;
        case 2:
          metricKey = 'wellness';
          metricValue = metrics.wellness;
          metricStatus = metricValue >= 75 ? 'Excellent' : metricValue >= 60 ? 'Good' : 'Needs Attention';
          break;
      }
      
      if (value) value.textContent = `${metricValue}%`;
      if (progressFill) progressFill.style.width = `${metricValue}%`;
      if (status) {
        status.textContent = metricStatus;
        status.className = 'health-card__status ' + (metricValue >= 70 ? 'status--success' : metricValue >= 50 ? 'status--warning' : 'status--error');
      }
    });
  }

  updateVitalSigns(vitals) {
    const vitalCards = document.querySelectorAll('.vital-card');
    
    vitalCards.forEach((card, index) => {
      const value = card.querySelector('.vital-card__value');
      const status = card.querySelector('.vital-card__status');
      const change = card.querySelector('.vital-card__change');
      
      let vitalData;
      switch(index) {
        case 0:
          vitalData = vitals.heartRate;
          break;
        case 1:
          vitalData = vitals.temperature;
          break;
        case 2:
          vitalData = vitals.weight;
          break;
      }
      
      if (value && vitalData) {
        const unitSpan = value.querySelector('.unit');
        value.innerHTML = `${vitalData.value} <span class="unit">${vitalData.unit}</span>`;
      }
      
      if (status && vitalData) {
        status.textContent = vitalData.status;
        status.className = 'vital-card__status ' + 
          (vitalData.status === 'Normal' ? 'status--success' : 
           vitalData.status === 'Stable' ? 'status--success' : 'status--warning');
      }
      
      if (change && vitalData && vitalData.change) {
        change.textContent = `${vitalData.change} from last visit`;
        change.className = 'vital-card__change ' + 
          (vitalData.change.startsWith('+') ? 'status--warning' : 'status--success');
      }
    });
  }

  initializeChart() {
    const ctx = document.getElementById('activityChart');
    if (!ctx) return;

    const petData = this.petHealthData[this.currentPet];
    
    // Destroy existing chart if it exists
    if (this.activityChart) {
      this.activityChart.destroy();
    }

    this.activityChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Activity Level (%)',
          data: petData.activityData,
          borderColor: '#1FB8CD',
          backgroundColor: 'rgba(31, 184, 205, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#1FB8CD',
          pointBorderColor: '#1FB8CD',
          pointBorderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 7
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            ticks: {
              callback: function(value) {
                return value + '%';
              }
            }
          }
        },
        elements: {
          point: {
            hoverBackgroundColor: '#1FB8CD'
          }
        }
      }
    });
  }

  updateChart(data) {
    if (this.activityChart) {
      this.activityChart.data.datasets[0].data = data;
      this.activityChart.update();
    }
  }

  updateNavigationState(activePageId) {
    // Remove active state from all nav links
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
      link.classList.remove('nav__link--active');
    });

    // Add active state to current page link
    const activeLink = document.querySelector(`[data-page="${activePageId}"]`);
    if (activeLink && activeLink.classList.contains('nav__link')) {
      activeLink.classList.add('nav__link--active');
    }
  }

  setupFormValidation() {
    // Email validation
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
      input.addEventListener('blur', () => this.validateEmail(input));
      input.addEventListener('input', () => this.clearValidation(input));
    });

    // Required field validation
    const requiredInputs = document.querySelectorAll('input[required], select[required], textarea[required]');
    requiredInputs.forEach(input => {
      input.addEventListener('blur', () => this.validateRequired(input));
      input.addEventListener('input', () => this.clearValidation(input));
    });
  }

  validateEmail(input) {
    const email = input.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) {
      this.showFieldError(input, 'Email is required');
      return false;
    }
    
    if (!emailRegex.test(email)) {
      this.showFieldError(input, 'Please enter a valid email address');
      return false;
    }
    
    this.showFieldSuccess(input);
    return true;
  }

  validateRequired(input) {
    const value = input.value.trim();
    
    if (!value) {
      this.showFieldError(input, `${this.getFieldLabel(input)} is required`);
      return false;
    }
    
    this.showFieldSuccess(input);
    return true;
  }

  getFieldLabel(input) {
    const label = document.querySelector(`label[for="${input.id}"]`);
    return label ? label.textContent.replace('*', '').trim() : 'This field';
  }

  showFieldError(input, message) {
    input.classList.remove('success');
    input.classList.add('error');
    
    const existingError = input.parentNode.querySelector('.error-message');
    if (existingError) {
      existingError.remove();
    }
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    input.parentNode.appendChild(errorDiv);
  }

  showFieldSuccess(input) {
    input.classList.remove('error');
    input.classList.add('success');
    
    const existingError = input.parentNode.querySelector('.error-message');
    if (existingError) {
      existingError.remove();
    }
  }

  clearValidation(input) {
    input.classList.remove('error', 'success');
    const existingError = input.parentNode.querySelector('.error-message');
    if (existingError) {
      existingError.remove();
    }
  }

  validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
      if (input.type === 'email') {
        if (!this.validateEmail(input)) {
          isValid = false;
        }
      } else {
        if (!this.validateRequired(input)) {
          isValid = false;
        }
      }
    });

    return isValid;
  }

  handleLogin(e) {
    e.preventDefault();
    
    if (this.validateForm(e.target)) {
      this.showModal(
        'Login Successful',
        'Welcome back! Redirecting to services...',
        ''
      );
      
      setTimeout(() => {
        this.closeModal();
        this.showPage('services');
      }, 2000);
    }
  }

  handleSignup(e) {
    e.preventDefault();
    
    if (this.validateForm(e.target)) {
      this.showModal(
        'Account Created Successfully',
        'Welcome to Pet Healthcare! Redirecting to services...',
        ''
      );
      
      setTimeout(() => {
        this.closeModal();
        this.showPage('services');
      }, 2000);
    }
  }

  handleAppointment(e) {
    e.preventDefault();
    
    if (this.validateForm(e.target)) {
      const appointmentData = {
        petName: document.getElementById('petName').value,
        petType: document.getElementById('petType').value,
        issue: document.getElementById('issueDescription').value,
        doctor: document.getElementById('doctorSelect').value,
        urgency: document.getElementById('urgencyLevel').value,
        date: document.getElementById('appointmentDate').value,
        time: document.getElementById('appointmentTime').value,
        referenceNumber: 'APT' + Date.now(),
        timestamp: new Date().toISOString()
      };

      const doctorInfo = this.doctorsData[appointmentData.doctor];
      const confirmationDetails = `
        <p><strong>Reference Number:</strong> ${appointmentData.referenceNumber}</p>
        <p><strong>Pet:</strong> ${appointmentData.petName} (${appointmentData.petType})</p>
        <p><strong>Doctor:</strong> ${doctorInfo.name}</p>
        <p><strong>Date & Time:</strong> ${appointmentData.date} at ${appointmentData.time}</p>
        <p><strong>Urgency:</strong> ${appointmentData.urgency}</p>
      `;

      this.showModal(
        'Appointment Booked Successfully',
        'Your appointment has been confirmed. Please arrive 15 minutes early.',
        confirmationDetails
      );

      e.target.reset();
    }
  }

  handleAdoptionPet(e) {
    e.preventDefault();
    
    if (this.validateForm(e.target)) {
      // Store pet data temporarily
      this.tempPetData = {
        name: document.getElementById('adoptPetName').value,
        type: document.getElementById('adoptPetType').value,
        age: document.getElementById('adoptPetAge').value,
        breed: document.getElementById('adoptPetBreed').value,
        temperament: document.getElementById('adoptPetTemperament').value,
        requirements: document.getElementById('adoptSpecialRequirements').value
      };

      // Add size or type specific data
      if (this.tempPetData.type === 'Dog') {
        this.tempPetData.size = document.getElementById('adoptDogSize').value;
        this.tempPetData.condition = document.getElementById('adoptPetCondition').value;
      } else if (this.tempPetData.type === 'Cat') {
        this.tempPetData.catType = document.getElementById('adoptCatType').value;
        this.tempPetData.condition = document.getElementById('adoptPetCondition2').value;
      }

      // Hide pet form and show adopter form
      document.getElementById('petDetailsForm').classList.add('hidden');
      document.getElementById('adopterDetailsForm').classList.remove('hidden');
    }
  }

  handleAdopter(e) {
    e.preventDefault();
    
    if (this.validateForm(e.target)) {
      const adoptionData = {
        pet: this.tempPetData,
        adopter: {
          name: document.getElementById('adopterName').value,
          email: document.getElementById('adopterEmail').value,
          phone: document.getElementById('adopterPhone').value,
          housing: document.getElementById('adopterHousing').value,
          address: document.getElementById('adopterAddress').value,
          experience: document.getElementById('adopterExperience').value,
          reason: document.getElementById('adopterReason').value
        },
        requestNumber: 'ADR' + Date.now(),
        timestamp: new Date().toISOString()
      };

      const confirmationDetails = `
        <p><strong>Request Number:</strong> ${adoptionData.requestNumber}</p>
        <p><strong>Pet:</strong> ${adoptionData.pet.name} (${adoptionData.pet.breed} ${adoptionData.pet.type})</p>
        <p><strong>Your Name:</strong> ${adoptionData.adopter.name}</p>
        <p><strong>Contact:</strong> ${adoptionData.adopter.email}</p>
        <p>We'll review your application and contact you within 48 hours.</p>
      `;

      this.showModal(
        'Adoption Request Submitted',
        'Thank you for your interest in dog and cat adoption!',
        confirmationDetails
      );

      // Reset forms
      document.getElementById('adoptionPetForm').reset();
      document.getElementById('adopterForm').reset();
      document.getElementById('petDetailsForm').classList.remove('hidden');
      document.getElementById('adopterDetailsForm').classList.add('hidden');
      
      // Reset breed options
      const breedSelect = document.getElementById('adoptPetBreed');
      breedSelect.innerHTML = '<option value="">First select pet type...</option>';
      
      // Hide size/type rows
      document.getElementById('dogSizeRow').classList.remove('show');
      document.getElementById('catTypeRow').classList.remove('show');
    }
  }

  handleDietPlanner(e) {
    e.preventDefault();
    
    if (this.validateForm(e.target)) {
      const dietData = {
        name: document.getElementById('dietPetName').value,
        type: document.getElementById('dietPetType').value,
        age: parseFloat(document.getElementById('dietPetAge').value),
        breed: document.getElementById('dietPetBreed').value,
        weight: parseFloat(document.getElementById('dietPetWeight').value),
        activity: document.getElementById('dietActivityLevel').value,
        health: document.getElementById('dietHealthCondition').value
      };

      const dietPlan = this.generateDietPlan(dietData);
      this.displayDietPlan(dietPlan, dietData);
    }
  }

  generateDietPlan(data) {
    let dailyCalories = 0;
    let mealFrequency = '';
    let recommendations = [];
    let specialNotes = [];
    let breedNotes = '';

    const guidelines = this.nutritionGuidelines[data.type];

    // Calculate base calorie requirements
    if (data.type === 'Dog') {
      if (data.age < 1) {
        dailyCalories = data.weight * guidelines.puppyCaloriesPerPound;
        mealFrequency = '3-4 meals per day (puppy)';
      } else if (data.age > 7) {
        dailyCalories = data.weight * guidelines.seniorCaloriesPerPound;
        mealFrequency = '2 meals per day (senior)';
      } else {
        dailyCalories = data.weight * guidelines.adultCaloriesPerPound;
        mealFrequency = '2 meals per day (adult)';
      }

      recommendations = [
        'High-quality commercial dog food (dry kibble)',
        'Lean proteins: chicken, turkey, fish',
        'Complex carbohydrates: brown rice, sweet potato',
        'Healthy fats: fish oil, flaxseed',
        'Fresh vegetables: carrots, green beans, peas',
        `Protein requirement: ${guidelines.proteinRequirement}`,
        `Fat requirement: ${guidelines.fatRequirement}`
      ];

      // Breed-specific notes for dogs
      breedNotes = this.getDogBreedNotes(data.breed);

    } else if (data.type === 'Cat') {
      if (data.age < 1) {
        dailyCalories = data.weight * guidelines.kittenCaloriesPerPound;
        mealFrequency = '4 meals per day (kitten)';
      } else if (data.age > 7) {
        dailyCalories = data.weight * guidelines.seniorCaloriesPerPound;
        mealFrequency = '2 meals per day (senior)';
      } else {
        dailyCalories = data.weight * guidelines.adultCaloriesPerPound;
        mealFrequency = '2 meals per day (adult)';
      }

      recommendations = [
        'High-protein commercial cat food',
        'Wet food to increase water intake',
        'Animal-based proteins: chicken, fish, turkey',
        'Limited carbohydrates',
        'Taurine-rich foods essential',
        `Protein requirement: ${guidelines.proteinRequirement}`,
        `Fat requirement: ${guidelines.fatRequirement}`
      ];

      specialNotes.push(guidelines.specialNotes);

      // Breed-specific notes for cats
      breedNotes = this.getCatBreedNotes(data.breed);
    }

    // Adjust for activity level
    const activityMultipliers = {
      'low': 0.8,
      'moderate': 1.0,
      'high': 1.4,
      'very-high': 1.8
    };
    dailyCalories *= activityMultipliers[data.activity] || 1.0;

    // Health condition adjustments
    switch (data.health) {
      case 'diabetes':
        dailyCalories *= 0.9;
        specialNotes.push('Low carbohydrate diet recommended');
        specialNotes.push('Multiple small meals to manage blood sugar');
        break;
      case 'kidney-disease':
        specialNotes.push('Reduced protein and phosphorus diet');
        specialNotes.push('Increased water intake essential');
        break;
      case 'heart-disease':
        dailyCalories *= 0.85;
        specialNotes.push('Low sodium diet required');
        specialNotes.push('Limited exercise, consult vet');
        break;
      case 'obesity':
        dailyCalories *= 0.7;
        specialNotes.push('Weight management diet with increased fiber');
        specialNotes.push('Measure all food portions carefully');
        break;
      case 'allergies':
        specialNotes.push('Limited ingredient or hypoallergenic diet');
        specialNotes.push('Avoid known allergens completely');
        break;
    }

    return {
      dailyCalories: Math.round(dailyCalories),
      mealFrequency,
      recommendations,
      specialNotes,
      breedNotes,
      feedingSchedule: this.generateFeedingSchedule(data.type, mealFrequency)
    };
  }

  getDogBreedNotes(breed) {
    const breedNotes = {
      'Golden Retriever': 'Prone to overeating; monitor portions carefully. May benefit from joint supplements.',
      'Labrador Retriever': 'High energy breed requiring larger portions. Watch for obesity tendencies.',
      'German Shepherd': 'May have sensitive digestion. Consider grain-free options.',
      'Bulldog': 'Prone to weight gain. Smaller, more frequent meals recommended.',
      'Beagle': 'Food-motivated breed. Measure portions precisely to prevent overeating.',
      'Chihuahua': 'Very small portions needed. May require frequent meals to prevent hypoglycemia.',
      'Border Collie': 'High energy breed requiring premium nutrition for sustained energy.',
      'Yorkshire Terrier': 'Small stomach capacity. Requires nutrient-dense, small-kibble food.'
    };
    return breedNotes[breed] || 'Standard nutrition guidelines apply for this breed.';
  }

  getCatBreedNotes(breed) {
    const breedNotes = {
      'Persian': 'Flat face may make eating difficult. Consider smaller kibble or wet food.',
      'Siamese': 'Active breed requiring higher calorie intake. Monitor weight regularly.',
      'Maine Coon': 'Large breed requiring larger portions. Slow growth until 3-5 years.',
      'British Shorthair': 'Prone to weight gain. Monitor portions carefully.',
      'Ragdoll': 'Large breed with calm temperament. Monitor for weight gain.',
      'Bengal': 'High energy breed requiring premium nutrition.',
      'Sphynx': 'Higher metabolism due to lack of fur. May require more calories.',
      'Scottish Fold': 'Monitor for joint issues. Consider joint-supporting nutrients.'
    };
    return breedNotes[breed] || 'Standard feline nutrition guidelines apply for this breed.';
  }

  generateFeedingSchedule(petType, frequency) {
    if (frequency.includes('3-4')) {
      return ['7:00 AM', '12:00 PM', '5:00 PM', '8:00 PM'];
    } else if (frequency.includes('2 meals')) {
      return ['8:00 AM', '6:00 PM'];
    } else if (frequency.includes('4 meals')) {
      return ['7:00 AM', '11:00 AM', '3:00 PM', '7:00 PM'];
    } else {
      return ['8:00 AM', '6:00 PM'];
    }
  }

  displayDietPlan(plan, petData) {
    const resultDiv = document.getElementById('dietPlanResult');
    const contentDiv = document.getElementById('dietPlanContent');
    const warningsDiv = document.getElementById('warningsList');

    const dietContent = `
      <div class="diet-result-section">
        <h4>Daily Calorie Requirements</h4>
        <div class="calorie-highlight">
          ${plan.dailyCalories} calories per day
        </div>
      </div>
      
      <div class="diet-result-section">
        <h4>Meal Frequency</h4>
        <p>${plan.mealFrequency}</p>
      </div>
      
      <div class="diet-result-section">
        <h4>Feeding Schedule</h4>
        <ul>
          ${plan.feedingSchedule.map(time => `<li>${time}</li>`).join('')}
        </ul>
      </div>
      
      <div class="diet-result-section">
        <h4>Recommended Foods</h4>
        <ul>
          ${plan.recommendations.map(rec => `<li>${rec}</li>`).join('')}
        </ul>
      </div>
      
      ${plan.breedNotes ? `
        <div class="breed-notes">
          <h5>🐕 ${petData.breed} Specific Notes</h5>
          <p>${plan.breedNotes}</p>
        </div>
      ` : ''}
      
      ${plan.specialNotes.length > 0 ? `
        <div class="diet-result-section">
          <h4>Special Dietary Notes</h4>
          <ul>
            ${plan.specialNotes.map(note => `<li>${note}</li>`).join('')}
          </ul>
        </div>
      ` : ''}
    `;

    contentDiv.innerHTML = dietContent;

    // Display food warnings
    const dangerousFoodsList = this.dangerousFoods[petData.type] || [];
    const warningsContent = dangerousFoodsList.map(food => 
      `<div class="warning-item">${food}</div>`
    ).join('');

    warningsDiv.innerHTML = `<div class="warning-list">${warningsContent}</div>`;

    resultDiv.classList.remove('hidden');
    resultDiv.scrollIntoView({ behavior: 'smooth' });
  }

  showModal(title, message, details = '') {
    const modal = document.getElementById('successModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalMessage = document.getElementById('modalMessage');
    const confirmationDetails = document.getElementById('confirmationDetails');

    modalTitle.textContent = title;
    modalMessage.textContent = message;
    confirmationDetails.innerHTML = details;

    modal.classList.remove('hidden');
  }

  closeModal() {
    const modal = document.getElementById('successModal');
    modal.classList.add('hidden');
  }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.petHealthcareApp = new PetHealthcareApp();
});

// Handle ESC key to close modal
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const modal = document.getElementById('successModal');
    if (modal && !modal.classList.contains('hidden')) {
      window.petHealthcareApp.closeModal();
    }
  }
});

// Handle browser back/forward navigation
window.addEventListener('popstate', (e) => {
  if (e.state && e.state.page) {
    window.petHealthcareApp.showPage(e.state.page);
  }
});

// Utility functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Handle window resize for responsive adjustments
window.addEventListener('resize', debounce(() => {
  // Handle responsive adjustments if needed
  if (window.petHealthcareApp && window.petHealthcareApp.activityChart) {
    window.petHealthcareApp.activityChart.resize();
  }
}, 250));





