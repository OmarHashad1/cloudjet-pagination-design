const allData = [
    { id: '1', name: 'Log entry 1', timestamp: '2023-10-01 12:00:00' },
    { id: '2', name: 'Log entry 2', timestamp: '2023-10-01 12:05:00' },
    { id: '3', name: 'Log entry 3', timestamp: '2023-10-01 12:10:00' },
    { id: '4', name: 'Log entry 4', timestamp: '2023-10-01 12:15:00' },
    { id: '5', name: 'Log entry 5', timestamp: '2023-10-01 12:20:00' },
    { id: '6', name: 'Log entry 6', timestamp: '2023-10-01 12:25:00' },
    { id: '7', name: 'Log entry 7', timestamp: '2023-10-01 12:30:00' },
    { id: '8', name: 'Log entry 8', timestamp: '2023-10-01 12:35:00' },
    { id: '9', name: 'Log entry 9', timestamp: '2023-10-01 12:40:00' },
    { id: '10', name: 'Log entry 10', timestamp: '2023-10-01 12:45:00' },
    { id: '11', name: 'Log entry 11', timestamp: '2023-10-01 12:50:00' },
    { id: '12', name: 'Log entry 12', timestamp: '2023-10-01 12:55:00' },
    { id: '13', name: 'Log entry 13', timestamp: '2023-10-01 13:00:00' },
    { id: '14', name: 'Log entry 14', timestamp: '2023-10-01 13:05:00' },
    { id: '15', name: 'Log entry 15', timestamp: '2023-10-01 13:10:00' },
    { id: '16', name: 'Log entry 16', timestamp: '2023-10-01 13:15:00' },
    { id: '17', name: 'Log entry 17', timestamp: '2023-10-01 13:20:00' },
    { id: '18', name: 'Log entry 18', timestamp: '2023-10-01 13:25:00' },
    { id: '19', name: 'Log entry 19', timestamp: '2023-10-01 13:30:00' },
    { id: '20', name: 'Log entry 20', timestamp: '2023-10-01 13:35:00' },
    { id: '21', name: 'Log entry 21', timestamp: '2023-10-01 13:40:00' },
    { id: '22', name: 'Log entry 22', timestamp: '2023-10-01 13:45:00' },
    { id: '23', name: 'Log entry 23', timestamp: '2023-10-01 13:50:00' },
    { id: '24', name: 'Log entry 24', timestamp: '2023-10-01 13:55:00' },
    { id: '25', name: 'Log entry 25', timestamp: '2023-10-01 14:00:00' },
    { id: '26', name: 'Log entry 26', timestamp: '2023-10-01 14:05:00' },
    { id: '27', name: 'Log entry 27', timestamp: '2023-10-01 14:10:00' },
    { id: '28', name: 'Log entry 28', timestamp: '2023-10-01 14:15:00' },
    { id: '29', name: 'Log entry 29', timestamp: '2023-10-01 14:20:00' },
    { id: '30', name: 'Log entry 30', timestamp: '2023-10-01 14:25:00' }
];

let currentData = [...allData];
let sortOrder = 'desc';
let searchTerm = '';

let currentPage = 1;
let entriesPerPage = 10;
let totalEntries = allData.length;
let totalPages = Math.ceil(totalEntries / entriesPerPage);

// Initialize table
function renderTable() {
    const tableBody = document.getElementById('tableBody');
    const tableContainer = document.querySelector('.dt-table-container');
    tableBody.innerHTML = '';

    if (currentData.length === 0) {
        tableContainer.style.display = 'none';
        
        const messageContainer = document.createElement('div');
        messageContainer.style.cssText = 'text-align: center; color: #888; padding: 40px; background: #1a1a1a; border-radius: 8px;';
        messageContainer.textContent = 'No records found';
        

        tableContainer.parentNode.insertBefore(messageContainer, tableContainer.nextSibling);
        messageContainer.id = 'noRecordsMessage';
        return;
    }

    tableContainer.style.display = 'block';
    
    const existingMessage = document.getElementById('noRecordsMessage');
    if (existingMessage) {
        existingMessage.remove();
    }

    const startIndex = (currentPage - 1) * entriesPerPage;
    const endIndex = startIndex + entriesPerPage;
    const pageData = currentData.slice(startIndex, endIndex);

    pageData.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="dt-id-cell">${item.id}</td>
            <td>${item.name}</td>
            <td class="dt-timestamp-cell">${item.timestamp}</td>
        `;
        tableBody.appendChild(row);
    });
}

function filterData() {
    if (searchTerm.trim() === '') {
        currentData = [...allData];
    } else {
        currentData = allData.filter(item => 
            item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.timestamp.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    
    totalEntries = currentData.length;
    totalPages = Math.ceil(totalEntries / entriesPerPage);
    currentPage = 1;
    
    renderTable();
    updatePaginationInfo();
    updatePaginationControls();
}


function handleSearch() {
    searchTerm = document.getElementById('searchInput').value;
    filterData();
}

function sortByTimestamp() {
    currentData.sort((a, b) => {
        const dateA = new Date(a.timestamp);
        const dateB = new Date(b.timestamp);
        
        if (sortOrder === 'desc') {
            return dateB - dateA;
        } else {
            return dateA - dateB;
        }
    });
    
    currentPage = 1;
    renderTable();
    updatePaginationInfo();
    updatePaginationControls();
}

function updatePaginationInfo() {
    const start = totalEntries === 0 ? 0 : (currentPage - 1) * entriesPerPage + 1;
    const end = Math.min(currentPage * entriesPerPage, totalEntries);
    
    document.getElementById('paginationInfo').textContent = 
        `Showing ${start}-${end} of ${totalEntries} entries`;
}


function updatePaginationControls() {
    const existingPageBtns = document.querySelectorAll('.dt-pagination-btn[data-page]');
    existingPageBtns.forEach(btn => btn.remove());
    
    const nextBtn = document.getElementById('nextBtn');
    
    if (totalPages === 0) {
        document.getElementById('firstBtn').disabled = true;
        document.getElementById('prevBtn').disabled = true;
        document.getElementById('nextBtn').disabled = true;
        document.getElementById('lastBtn').disabled = true;
        return;
    }
    
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);
    
    if (endPage - startPage < 4) {
        startPage = Math.max(1, endPage - 4);
    }
    
    for (let i = startPage; i <= endPage; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = 'dt-pagination-btn';
        pageBtn.dataset.page = i;
        pageBtn.textContent = i;
        
        if (i === currentPage) {
            pageBtn.classList.add('active');
        }
        
        pageBtn.addEventListener('click', function() {
            goToPage(parseInt(this.dataset.page));
        });
        
        nextBtn.parentNode.insertBefore(pageBtn, nextBtn);
    }

    document.getElementById('firstBtn').disabled = currentPage === 1;
    document.getElementById('prevBtn').disabled = currentPage === 1;
    document.getElementById('nextBtn').disabled = currentPage === totalPages;
    document.getElementById('lastBtn').disabled = currentPage === totalPages;
}

function goToPage(page) {
    if (page >= 1 && page <= totalPages) {
        currentPage = page;
        renderTable();
        updatePaginationInfo();
        updatePaginationControls();
    }
}

document.getElementById('entriesSelect').addEventListener('change', function() {
    entriesPerPage = parseInt(this.value);
    totalPages = Math.ceil(totalEntries / entriesPerPage);
    
    if (currentPage > totalPages) {
        currentPage = totalPages > 0 ? totalPages : 1;
    }
    
    renderTable();
    updatePaginationInfo();
    updatePaginationControls();
});

document.getElementById('searchBtn').addEventListener('click', handleSearch);
document.getElementById('searchInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        handleSearch();
    }
});

document.getElementById('searchInput').addEventListener('input', function() {
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
        handleSearch();
    }, 300);
});

document.getElementById('firstBtn').addEventListener('click', () => goToPage(1));
document.getElementById('prevBtn').addEventListener('click', () => goToPage(currentPage - 1));
document.getElementById('nextBtn').addEventListener('click', () => goToPage(currentPage + 1));
document.getElementById('lastBtn').addEventListener('click', () => goToPage(totalPages));

document.getElementById('timestampHeader').addEventListener('click', function() {
    const arrow = this.querySelector('.dt-sort-arrow');
    if (sortOrder === 'desc') {
        sortOrder = 'asc';
        arrow.textContent = '↑';
    } else {
        sortOrder = 'desc';
        arrow.textContent = '↓';
    }
    sortByTimestamp();
});

function initialize() {
    sortByTimestamp();
}

initialize();