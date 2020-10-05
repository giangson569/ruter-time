"use strict";

// 
class defaultTimes {
  constructor(id){
    this.ids = id;
  }
  set setDefaultTimes(times){
    return this.ids.value = times;
  }
}
let setTimeDefaultStart,setTimeDefaultEnd,presentTimeDefault;
presentTimeDefault = new Date();
setTimeDefaultStart = new defaultTimes(document.getElementById('datetime-start'));
setTimeDefaultEnd = new defaultTimes(document.getElementById('datetime-end'));
setTimeDefaultStart.setDefaultTimes = '1995-06-15T09:36';
setTimeDefaultEnd.setDefaultTimes = presentTimeDefault.toISOString().replace(/:(\d{1,2})+(\.\d{1,3}Z)$/g,'');

//
class checkInputs {
  constructor(input,output){
    this.inputs = document.getElementById(input);
    this.outputs = document.getElementById(output);
  }
  get vacate(){
    try{
      if(this.inputs.value === ''){
        this.inputs.setCustomValidity('bạn không được bỏ qua trường này');
        throw this.inputs.validationMessage;
      }else{
        this.inputs.setCustomValidity('');
        throw this.inputs.validationMessage;
      }
    }catch(err){
      this.outputs.innerHTML = err;
      var booleatResu = (err ===  '') ? true : false;
      return booleatResu;
    }
  }
  duplication(comparativeValues,errMessage){
    try{
      if(this.inputs.value >= comparativeValues){
        this.inputs.setCustomValidity(errMessage);
        throw this.inputs.validationMessage;
      }else{
        this.inputs.setCustomValidity('');
        throw this.inputs.validationMessage;
      }
    }catch(err){
      this.outputs.innerHTML = err;
      var booleatResu = (err ===  '') ? true : false;
      return booleatResu;
    }
  }
  get nameSake(){
    let accessTagNameTime,listCompareData,resCom;
    accessTagNameTime = this.inputs.value;
    listCompareData = document.getElementById('list-data').innerHTML;
    resCom = listCompareData.toString().search('<summary>' + accessTagNameTime + '</summary>');
    
    try{
      if(resCom !== -1){
        this.inputs.setCustomValidity('tên này đã được lưu rồi, bạn hãy nhập tên khác');
        throw this.inputs.validationMessage;
      }else{
        this.inputs.setCustomValidity('');
        throw this.inputs.validationMessage;
      }
    }catch(err){
      this.outputs.innerHTML = err;
      var booleatResu = (err ===  '') ? true : false;
      return booleatResu;
    }
  }
}

//
class counts {
  constructor(countFrom){
    this.countFroms = countFrom;
    this.countTo = 100;
    this.listCountResults = [];
    this.countResults = 0;
  }
  set setCountTos(toCount){
    return this.countTo = toCount.value;
  }
  get countTimes(){
    const timeFrom = new Date(this.countFroms.value).getTime();
    const timeTo = Date.parse(this.countTo);
    
    let eventFor,eventWhile,listCountTimes,countTime,listTimeUnits;
    listCountTimes = [1000,(1000*60),(1000*60*60),(1000*60*60*24),(1000*60*60*24*7),(1000*60*60*24*30),
      (1000*60*60*24*30*12),(1000*60*60*24*30*12*100),(1000*60*60*24*30*12*1000)];
    listTimeUnits = [' Giây',' Phút',' Tiếng',' Ngày',' Tuần',' Tháng',' Năm',' Thế kỷ',' Thiên Niên Kỷ'];
    
    for(eventFor = 0; eventFor < 9; eventFor++){
      eventWhile = [timeFrom,timeTo];
      countTime = -1;
      while(eventWhile[0] < eventWhile[1]){
        eventWhile[0] += listCountTimes[eventFor];
        countTime += 1;
      }
      this.listCountResults[eventFor] = '<li><strong>' + countTime.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
        + '</strong>'+ listTimeUnits[eventFor] + '</li>';
    }
    
    this.listCountResults.unshift('<li>kể từ thời điểm ' + '<time datetime="'
      + this.countFroms.value.toString().replace(/T(?=\d{2})/g, ' ') + '">'
      + this.countFroms.value.toString().replace(/T(?=\d{2})/g, ' ') + '</time> cho đến thời điểm '
      + '<time datetime="' + this.countTo.toString().replace(/T(?=\d{2})/g, ' ') + '">'
      + this.countTo.toString().replace(/T(?=\d{2})/g, ' ') + '</time> đã đo được</li>');
    
    
    return this.listCountResults.join(' ');
  }
}

//
class archive {
  constructor(nameData){
    this.nameDatas = nameData;
    this.listResultData = [];
    this.listAccessData = [];
    this.determeniData = 0;
  }
  set saveData(information){
    let dataTypeString,listName;
    dataTypeString = String(information.join('|'));
    listName = localStorage.getItem(this.nameDatas);
    
    if(typeof(Storage) !== 'undefined'){
      localStorage.setItem(information[0],dataTypeString);
      localStorage.setItem(this.nameDatas,listName + '|' + information[0]);
    }else{document.getElementById('errors').innerHTML = 'rất tiếc trình duyệt của bạn không hố trợ lưu trữ'}
  }

  get dataAccess(){
    let eventFor,inDexData,separatingData,dataName,dataContent,fiterSD;
    inDexData = 0;
    
    if(localStorage.getItem(this.nameDatas) === null){
      localStorage.setItem(this.nameDatas,'saved');
      localStorage.setItem('saved','saved|0');
    }
    
    eventFor = localStorage.getItem(this.nameDatas).split('|');
    
    for(;inDexData < eventFor.length;inDexData++){
      separatingData = localStorage.getItem(eventFor[inDexData]).split('|');
      dataName = separatingData[0];
      dataContent = separatingData[1];
      localStorage.setItem('saved',': |' + inDexData);
      
      if(inDexData === 0){
        this.listAccessData[inDexData] = 'saved';
      }else{            
        this.listResultData[inDexData] = '<li><details class="dat"><summary>' + dataName + '</summary>'
          + '<img src="../../resources/image/menuf.png" alt="hộp menu" onclick="heddenBoxFunc(1,' + inDexData + ',0)" />'
          + '<ul class="setFun"><li onclick="heddenBoxFunc(0,' + inDexData + ',1)">Xóa</li>'
          + '<li onclick="heddenBoxFunc(0,' + inDexData + ',2)">Sửa</li>'
          + '<li onclick="heddenBoxFunc(0,' + inDexData + ',0)">Đóng</li>'
          + '</ul><ul>' + dataContent + '</ul></details></li>';

        this.listAccessData[inDexData] = dataName;
      }
    }
    localStorage.setItem(this.nameDatas,this.listAccessData.join('|'));
    this.listResultData.reverse();
    this.listResultData.unshift('<li class="setFun s1"><p>số mục bạn đã lưu '
      + localStorage.getItem('saved').replace('|','') + ' mục</p></li>');
    if(this.listResultData.length > 1){
      this.listResultData.pop();
    }
    return this.listResultData.join(' ');
  }
  set determeniManipulationData(numda){
    return this.determeniData = numda;
  }
  get removeData(){
    if(typeof(Storage) !== 'undefined'){
      localStorage.removeItem(this.listAccessData[this.determeniData]);
      this.listAccessData.splice(this.determeniData,1);
      this.listResultData.splice((this.listResultData.length-1)-this.determeniData,1);
      localStorage.setItem(this.nameDatas,this.listAccessData.join('|'));
    }
  }
  set reName(newName){
    let separatingData;
    separatingData = localStorage.getItem(this.listAccessData[this.determeniData]).split('|');
    if(typeof(Storage) !== 'undefined'){
      localStorage.setItem(newName,newName + '|' + separatingData[1]);
      localStorage.removeItem(this.listAccessData[this.determeniData]);
      this.listAccessData.splice(this.determeniData,1,newName);
      this.listResultData.splice((this.listResultData.length-1)-this.determeniData,1);
      localStorage.setItem(this.nameDatas,this.listAccessData.join('|'));
    }
  }
  }