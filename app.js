document.addEventListener('DOMContentLoaded', () => {
  const btnToggleForm = document.getElementById('btn-toggle-form');
  const btnDeleteLast = document.getElementById('btn-delete-last');
  const addFormSection = document.getElementById('add-form-section');
  const addForm = document.getElementById('add-form');
  const btnCancel = document.getElementById('btn-cancel');
  
  const countNumber = document.getElementById('count-number');
  const cardSmallSection = document.getElementById('card-small-section');
  const cardLargeSection = document.getElementById('card-large-section');

  // Update total member count dynamically
  function updateMemberCount() {
    const totalMembers = cardSmallSection.children.length;
    countNumber.textContent = totalMembers;
  }

  // Toggle form visibility
  btnToggleForm.addEventListener('click', () => {
    addFormSection.classList.toggle('hidden');
  });

  // Cancel form
  btnCancel.addEventListener('click', () => {
    addForm.reset();
    addFormSection.classList.add('hidden');
  });

  // Delete last baby lion
  btnDeleteLast.addEventListener('click', () => {
    if (cardSmallSection.lastElementChild) {
      cardSmallSection.lastElementChild.remove();
    }
    if (cardLargeSection.lastElementChild) {
      cardLargeSection.lastElementChild.remove();
    }
    updateMemberCount();
  });

  // Add new baby lion
  addForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get values
    const name = document.getElementById('input-name').value;
    const part = document.getElementById('input-part').value;
    const techStr = document.getElementById('input-tech').value;
    const shortIntro = document.getElementById('input-short-intro').value;
    const longIntro = document.getElementById('input-long-intro').value;
    const email = document.getElementById('input-email').value;
    const phone = document.getElementById('input-phone').value;
    const website = document.getElementById('input-website').value;
    const word = document.getElementById('input-word').value;

    // Process Tech array and Badge
    const techArray = techStr.split(',').map(item => item.trim()).filter(item => item !== '');
    const badgeText = techArray.length > 0 ? techArray[0] : 'None';

    // Create Small Card
    const smallCardHtml = `
      <article class="card card-small">
        <div class="img-wrap">
          <img class="profile-img" src="/img/itsme.jpg" alt="profile" />
          <span class="badge">${badgeText}</span>
        </div>
        <div class="text-group">
          <p class="card-small-name">${name}</p>
          <p class="track">${part}</p>
          <p class="introduce">${shortIntro}</p>
        </div>
      </article>
    `;
    cardSmallSection.insertAdjacentHTML('beforeend', smallCardHtml);

    // Create Large Card
    // First map tech array to li elements
    const techLis = techArray.map(tech => `<li>${tech}</li>`).join('');

    const largeCardHtml = `
      <article class="card card-large">
        <div class="profile">
          <p class="card-large-name">${name}</p>
          <p class="track">${part}</p>
          <p class="group">LION TRACK</p>
        </div>
        <div class="introduce">
          <p class="essential">자기소개</p>
          <p>${longIntro.replace(/\n/g, '<br>')}</p>
        </div>
        <div class="contact">
          <p class="essential">연락처</p>
          <ul>
            <li>EMAIL: ${email}</li>
            <li>Phone: ${phone}</li>
            <li>Github: <a href="${website}">Github Profile</a></li>
          </ul>
        </div>
        <div class="skills">
          <p class="essential">관심 기술</p>
          <ul>
            ${techLis}
          </ul>
        </div>
        <div class="last">
          <p class="essential">한 마디</p>
          <p class="a-word">${word}</p>
        </div>
      </article>
    `;
    cardLargeSection.insertAdjacentHTML('beforeend', largeCardHtml);

    // After adding, clean up
    updateMemberCount();
    addForm.reset();
    addFormSection.classList.add('hidden');
  });

  // Initial count setup
  updateMemberCount();
});
