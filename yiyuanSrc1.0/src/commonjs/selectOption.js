
     // 构造下拉列表
    var dealSelectOption = function(arr) {
        let optionArr = [];
        for (let i = 1; i < arr.length; i++) {
          //因为时段选择对应值后端是1,2,3所以这里从1开始计数了
          var areaOptionObj = {};
          (areaOptionObj.value = i), (areaOptionObj.label = arr[i]);
          optionArr.push(areaOptionObj);
        }
        return optionArr;
      }

    export { dealSelectOption }