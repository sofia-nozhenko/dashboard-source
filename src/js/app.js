import * as flsFunctions from "./modules/functions.js";
flsFunctions.isWebp();

import data from "../data/data.json";
const tableBody = $("#tbody");

$(document).ready(function () {
    /*
    Sidebar
    */
    $("#btn-open").on("click", function () {
        $(".main-sidebar").toggleClass("sidebar-closed");
        $("#main-wrapper").toggleClass("sidebar-active");
    });

    /* 
    Template for table
    */
    function createTemplate(item) {
        const isActive = item.status === "Active";
        return `
            <tr>
                <td>${item.name}</td>
                <td>${item.company}</td>
                <td>${item.phone}</td>
                <td>${item.email}</td>
                <td>${item.country}</td>
                <td>
                    <button class="table-btn ${
                        isActive ? "table-btn_active" : "table-btn_inactive"
                    }">${item.status}</button>
                </td>
            </tr>
        `;
    }
    const itemsPerPage = 8;
    let currentPage = 1;

    function renderItems(data) {
        const templates = data.map(createTemplate);
        tableBody.html(templates.join(""));
    }

    /* 
    Quantity of data
    */
    $("#quantity").text(data.length);

    /*
    Initial render
    */
    const initialData = data.slice(0, itemsPerPage);
    renderItems(initialData);
    displayPagination(data, itemsPerPage);
    amountOfEntries(currentPage, false);

    /* 
    Prev Next buttons
    */
    function prevPageHandler() {
        if (currentPage > 1) {
            currentPage--;
            renderItems(getCurrentPageData());
            updatePaginationButtons();
            amountOfEntries(currentPage, false);
        }
    }
    function nextPageHandler() {
        const totalPages = Math.ceil(data.length / itemsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            renderItems(getCurrentPageData());
            updatePaginationButtons();
            amountOfEntries(currentPage, false);
        }
    }
    $("#next").on("click", nextPageHandler);
    $("#prev").on("click", prevPageHandler);

    /*
    Pagination buttons
    */
    function displayPagination(data, itemsPerPage) {
        const paginationEl = $(".main-pages-btns");
        const pageCounter = Math.ceil(data.length / itemsPerPage);
        const divEl = $("<div>").addClass("main-pages-wrapp");

        for (let i = 0; i < pageCounter; i++) {
            const btnEl = displayPaginationBtn(i + 1);
            divEl.append(btnEl);
        }

        paginationEl.html(divEl);
        updatePaginationButtons();
    }
    function displayPaginationBtn(page) {
        const btnEl = $("<button>").addClass("main-pages-btn").text(page);

        btnEl.on("click", () => {
            currentPage = page;
            renderItems(getCurrentPageData());
            updatePaginationButtons();
            amountOfEntries(currentPage, false);
        });

        return btnEl;
    }
    function updatePaginationButtons() {
        $(".main-pages-btn").removeClass("active");
        $(`.main-pages-btn:contains('${currentPage}')`).addClass("active");
    }
    function getCurrentPageData() {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return data.slice(startIndex, endIndex);
    }

    /*
    Filter by name
    */
    $("#searchInput").on("input", function () {
        const searchTerm = $(this).val();
        const filteredData = filterDataByName(searchTerm);
        renderItems(filteredData.slice(0, itemsPerPage));
        displayPagination(filteredData, itemsPerPage);
        if (searchTerm.length <= 0) {
            amountOfEntries(currentPage, false);
        }
    });
    function filterDataByName(searchTerm) {
        const filteredData = data.filter((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        amountOfEntries(filteredData.length, true);
        return filteredData;
    }

    /* 
    Amount of entries
    */
    function amountOfEntries(currentPage, isForSearch) {
        let entries = itemsPerPage * currentPage - itemsPerPage + 1;
        if (isForSearch) {
            $("#entriesInfo").text(
                `Showing ${currentPage} entries out of  ${data.length}`
            );
        } else {
            $("#entriesInfo").text(
                `Showing data ${entries} to ${
                    itemsPerPage * currentPage
                }  of  ${data.length} entries`
            );
        }
    }
});
