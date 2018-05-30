var student = $('ul.student-list li.student-item');
var studentNumber = $('ul.student-list li.student-item:visible').length;
var numberOfPages;
var studentPerPage = 10;
var pageNumber;
var maxStudent;
var minStudent;

/* Generate HTML Buttons */

function generateButtons() {
    numberOfPages = Math.ceil($('ul.student-list li.student-item:visible').length / studentPerPage); /* Calculate the number of pages needed */
    var html = `<div class="pagination"><ul>`; /* Add pagination HTML */
    for (var i = 1; i <= numberOfPages; i++) { /* Loop to create each button */
        html += `<li><a href="#">${i}</a></li>`;
    }
    html += `</ul></div>`;
    $(".student-list").append(html); /* Append button to page */
    $(".pagination ul li:nth-child(1) a").addClass("active"); /* Set first button to active state */

    /* Show / hide students based on page number */

    $(".pagination ul li a").click(function(e) {
        $(".active").removeClass("active"); /* Remove active class */
        $(this).addClass("active"); /* Set active class */

        pageNumber = parseInt($(this).html()); /* Set page number */
        maxStudent = pageNumber * 10; /* Calc max students */
        minStudent = maxStudent - 10; /* Calc min students */

        for (var i = 0; i < studentNumber; i++) { /* Loop to show / hide students based on index position*/
            if (i >= minStudent && i < maxStudent) {
                student[i].style.display = '';
            } else {
                student[i].style.display = 'none';
            }
        }
        e.preventDefault(); /* Prevent default link behaviour */
    });
}

/* Enable start state on load */

function startState() {
    $(".pagination ul li:nth-child(1) a").trigger('click'); /* Set inital page state on load */
}

/* Create search box HTML */

function search() {
    var html = `<div class="student-search"><input placeholder="Search for students..."><button>Search</button></div>`; /* Create search HTML */
    $(".page-header.cf").append(html); /* Append search box */
}

/* Search Functionality */

function searched() {
    var searchButton = $('.student-search button');
    var counter = 0; /* Counter to see if no results are returned */
    $(searchButton).click(function() {
        $('.error-message').remove();
        var term = $('.student-search input').val().toLowerCase(); /* Convert user input into lowercase */
        for (var i = 0; i < studentNumber; i++) { /* Loop to search for manching results */
            if (student[i].innerHTML.indexOf(term) > -1) { /* Show matched students */
                student[i].style.display = '';
            } else {

                student[i].style.display = 'none'; /* Hide un-maching students */
                counter = counter + 1; /* Add to counter */

            }
        }

        $('.pagination').remove(); /* Remove old padgination */
        generateButtons(); /* Add new pagination */

        if (counter == studentNumber) {
            html = '<div class ="error-message"><br><br><h2>Sorry no matches found</h2></div>'; /* Create error message HTML */
            $('.page-header.cf').append(html); /* Append error message */
            counter = 0;
            $('.pagination').remove(); /* Remove pagination */

        } else if (counter === 0) {
            startState(); /* If nothing in search - Show all */
        } else {
            counter = 0; /* Re-start counter */

        }

    });
}

/* Call functions */

generateButtons();
startState();
search();
searched();
