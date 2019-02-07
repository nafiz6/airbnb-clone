document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.datepicker');
    var options = {
        selectMonths: true,
        selectYears: 100,
        format: 'dd-mmm-yyyy'};
    var instances = M.Datepicker.init(elems, options);
});

