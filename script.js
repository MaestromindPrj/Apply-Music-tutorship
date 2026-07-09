const form = document.getElementById("applyForm");
const submitBtn = document.getElementById("submitBtn");
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyPcjZxcPuUyqTs7wTd4hEFxisJZ9OPp5UzY5aL3ac_1lN8NslfPdonz1MxO_op7IdKgw/exec";

form.addEventListener("submit", async function (e) {

  e.preventDefault();


  const data = {

    name: document.getElementById("name").value.trim(),

    phone: document.getElementById("phone").value.trim(),

    musicLink: document.getElementById("music-link").value.trim(),

    message: document.getElementById("message").value.trim(),

    budget: document.getElementById("budget").value,


  };

  try {
    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting...";
    submitBtn.style.cursor = "not-allowed";
    const response = await fetch(SCRIPT_URL, {

      method: "POST",

      body: JSON.stringify(data)

    });

    const result = await response.json();

    if(result.result === "success"){

      // Tell Meta that a lead was generated
      fbq('track', 'Lead');
      
      form.reset();

      submitBtn.disabled = false;
      submitBtn.textContent = "Apply Now";
      submitBtn.style.cursor = "pointer";

      alert("Application submitted successfully!");

    }else{
      submitBtn.disabled = false;
      submitBtn.textContent = "Apply Now";
      submitBtn.style.cursor = "pointer";
      alert("Something went wrong.");

    }

  }catch(error){
    submitBtn.disabled = false;
    submitBtn.textContent = "Apply Now";
    submitBtn.style.cursor = "pointer";
    alert("Network Error");

    console.error(error);

  }

});    
      
      
      /* ==========================
        HERO ANIMATION
      ========================== */

      window.addEventListener("load", () => {

        const heroItems = [
          document.querySelector(".hero-left"),
          document.querySelector(".hero-right"),
          document.querySelector(".hero-image")
        ];

        heroItems.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add("active");
          }, index * 300);
        });

      });


      /* ==========================
        SCROLL REVEAL
      ========================== */

      const observer = new IntersectionObserver(
        (entries) => {

          entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            entry.target.classList.add("active");

            observer.unobserve(entry.target);

          });

        },
        {
          threshold: 0.2
        }
      );

      document.querySelectorAll(".reveal").forEach(el => {
        observer.observe(el);
      });


      /* ==========================
        STAGGER CARDS
      ========================== */

      const staggerGroups = [

        ".stats-grid .stagger",
        ".why-grid .stagger",
        ".testimonial-grid .stagger",
        ".roadmap-wrapper .stagger",
        ".outcomes-grid .stagger",
        ".industry-stats .stagger",
        ".audience-list .stagger"

      ];

      staggerGroups.forEach(selector => {

        const items = document.querySelectorAll(selector);

        if (!items.length) return;

        const groupObserver = new IntersectionObserver(
          (entries) => {

            entries.forEach(entry => {

              if (!entry.isIntersecting) return;

              items.forEach((item, index) => {

                setTimeout(() => {
                  item.classList.add("active");
                }, index * 150);

              });

              groupObserver.disconnect();

            });

          },
          {
            threshold: 0.2
          }
        );

        groupObserver.observe(items[0]);

      });

      

