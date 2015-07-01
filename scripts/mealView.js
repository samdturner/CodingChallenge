(function () {
  var Meal = window.Meal =  function (mealId, mealName, calories, totalFat,
                                      cholesterol, image, editable) {
    this.mealId = mealId;
    this.mealName = mealName;
    this.calories = calories;
    this.totalFat = totalFat;
    this.cholesterol = cholesterol;
    this.image = image;
    this.isEditable = editable;
  };

  Meal.prototype.updateData = function (event) {
    var inputEl = event.srcElement;
    var inputVal = inputEl.value;
    var inputName = inputEl.name;
    var idString = '#' + inputName + '-' + this.mealId;
    var span = $(idString).find('span');
    span.text(inputVal);
    span.addClass('dirty');
  };

  Meal.prototype.cleanData = function () {
    $('span').removeClass('dirty');
  };

  Meal.prototype.saveData = function (event) {
    event.preventDefault();
    this.mealName = $('input[name="name"]').val();
    this.calories = $('input[name="calories"]').val();
    this.totalFat= $('input[name="total-fat"]').val();
    this.cholesterol= $('input[name="cholesterol"]').val();

    this.cleanData();

    $.ajax({
      url: "http://private-anon-e398381b1-ivapi.apiary-mock.com/meals/" + this.mealId,
      method: "PUT",
      data: { meal: this.mealName,
              calories: this.calories,
              total_fat: this.totalFat,
              cholesterol: this.cholesterol
            },
      });
  };

  Meal.prototype.createEditForm = function () {
    this.removeEventHandlers();
    var formSection = $('section.meal-edit-form');
    var formTemplate = '<form>\
                          <label>Name\
                            <input type="text" name="name"\
                            value="' + this.mealName + '">\
                          </label>\
                          <label>Calories\
                            <input type="number" name="calories"\
                            value="' + this.calories + '">\
                          </label>\
                          <label>Total fat\
                            <input type="number" name="total-fat"\
                            value="' + this.totalFat + '">\
                          </label>\
                          <label>Cholesterol\
                            <input type="number" name="cholestorol"\
                            value="' + this.cholesterol + '">\
                          </label>\
                          <button type="submit">Save</button>\
                        </form>'
    formSection.html(formTemplate);
    formSection.keyup(this.updateData.bind(this));
    $('button').click(this.saveData.bind(this));
  };

  Meal.prototype.addEventHandler = function () {
    var containerId = '#container-' + this.mealId;
    if(this.isEditable) {
      $(containerId).click(this.createEditForm.bind(this));
    }
  };

  Meal.prototype.removeEventHandlers = function () {
    $('.meal-edit-form').unbind('keyup');
    $('button').unbind('click');
  };

  Meal.prototype.render = function () {
    var section = $('section.meal-descriptions');
    var mealTemplate = '<article id="container-' + this.mealId + '">\
                          <h1 id="meal-name-' + this.mealId + '">' + this.mealName + '</h1>\
                          <ul>\
                            <li id="calories-' + this.mealId + '">Calories: ' + '<span>' + this.calories + '<span></li>\
                            <li id="total-fat-' + this.mealId + '">Total fat: ' + this.totalFat + '</li>\
                            <li id="cholesterol-' + this.mealId + '">Cholesterol: ' + this.cholesterol + '</li>\
                          </ul>\
                        </article>'

    section.append(mealTemplate);
    this.addEventHandler();
  };
})();
