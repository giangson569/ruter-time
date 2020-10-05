"use strict";

//
function operatingDataTime(){
  let consistencyCheck,checkVacantTopics,checkTimeDistance,accessTagTimeEnd,displayResultTimes;
  checkVacantTopics = new checkInputs('topics-time','errors');
  checkTimeDistance = new checkInputs('datetime-start','errors');
  accessTagTimeEnd = document.getElementById('datetime-end');
  
  consistencyCheck = (checkVacantTopics.vacate && checkTimeDistance.duplication(accessTagTimeEnd.value,'thời gian\
    bắt đầu không được lớn hơn hoặc bằng thời gian đích'));
  
  if(consistencyCheck === true){
    processingTime();
    setTimeout(() => {
      let countTime = new counts(checkTimeDistance.inputs);
      countTime.setCountTos = accessTagTimeEnd;
      displayResultTimes = document.getElementById('list-results');
      displayResultTimes.innerHTML = countTime.countTimes;
      setTimeout(() => {
        let accessTagBoxSave = document.getElementById('boxsave');
        return accessTagBoxSave.style.bottom = 0;
      },3000)
    },969)
  }
  document.getElementById('boxsave').style.bottom = -70 + 'px';
  return document.getElementById('list-results').innerHTML = '';
}
document.getElementById('sumi').addEventListener('click',operatingDataTime);

//
function processingTime(){
  let boxProg,processingLevel,processing,completeLevels;
  boxProg = document.getElementById('loading');
  processingLevel = document.getElementById('barprog');
  boxProg.style.display = 'block';
  completeLevels = 10;
  processing = setInterval(() => {
    completeLevels += 1;
    processingLevel.value = completeLevels;
    if(completeLevels === 100){
      boxProg.style.display = 'none';
      clearInterval(processing);
    }
  },33)
}

//
let saves = new archive('periodOfTime');
function dataStorageManager(){
  let accessTopicsTime,informaData,eventSave,boxSave,inDexClas;
  accessTopicsTime = document.getElementById('topics-time').value;
  informaData = document.getElementById('list-results').innerHTML;
  boxSave = document.getElementById('boxsave');
  eventSave = new checkInputs('topics-time','errors');
  eventSave.nameSake;
  inDexClas = document.getElementsByClassName('setFun');
  
  if(eventSave.nameSake){
    saves.saveData = [accessTopicsTime,informaData];
    inDexClas[(inDexClas.length-1)].style.display = 'none';
    notificationCompleted(1,'đã lưu kết quả');
    return dataExport();
  }
  if(saves.listAccessData.length !== 0){
    heddenBoxFunc(0,1,0);
  }
  return boxSave.style.bottom = -70 + 'px';
}
document.getElementById('save').addEventListener('click',dataStorageManager);

//
function dataExport(){
  let accessListData = document.getElementById('list-data');
  return accessListData.innerHTML = saves.dataAccess;
}
dataExport();

//
function heddenBoxFunc(ct,cli,tybox){
  let disBox,classIndex,accessBoxDelete,accessBoxChange;
  disBox = document.getElementsByClassName('setFun');
  classIndex = saves.listResultData.length-cli;
  accessBoxDelete = document.getElementById('deletedata');
  accessBoxChange = document.getElementById('changenamedata');
  saves.determeniManipulationData = cli;

  if(ct == 1){
    disBox[classIndex].style.display = 'block';
  }else{
    disBox[classIndex].style.display = 'none';
  }
  
  switch(tybox){
    case 1:
      accessBoxDelete.style.display = 'block';
      break;
    case 2:
      accessBoxChange.style.display = 'block';
      break;
    default:
      accessBoxDelete.style.display = 'none';
      accessBoxChange.style.display = 'none';
      break;
  }
}

//
function removeDataFun(dicide){
let accessBoxDelete = document.getElementById('deletedata');
if(dicide === 'delete'){
saves.removeData;
accessBoxDelete.style.display = 'none';
notificationCompleted(2,'đã xóa mục');
return dataExport();
}else{accessBoxDelete.style.display = 'none';}
}
document.getElementById('nodele').addEventListener('click',() => removeDataFun('nodelete'));
document.getElementById('dele').addEventListener('click',() => removeDataFun('delete'));

//      
function reNameFun(dicide){
  let accessBoxReNa,eventRename,consistencyCheck,accessTagChanada,accessTagErr;
  accessBoxReNa = document.getElementById('changenamedata');
  eventRename = new checkInputs('chanada','errorchaname');
  accessTagChanada = document.getElementById('chanada');
  accessTagErr = document.getElementById('errorchaname');
  
  consistencyCheck = (eventRename.vacate && eventRename.nameSake);
  
  if(dicide === 'rename' && consistencyCheck){
    saves.reName = accessTagChanada.value;
    accessBoxReNa.style.display = 'none';
    notificationCompleted(2,'đã sửa lại tên mục');
    return dataExport();
  }else if(dicide === 'rename' && consistencyCheck === false){
    accessBoxReNa.style.display = 'block';
  }else{
    accessTagChanada.value = '';
    accessTagErr.innerHTML = '';
    accessBoxReNa.style.display = 'none';
  }
}
document.getElementById('nocha').addEventListener('click',() => reNameFun('norename'))
document.getElementById('cha').addEventListener('click',() => reNameFun('rename'))

//      
function notificationCompleted(displays,contents){
  let accessTagDis,createTagDialog,createContentDialog;
  accessTagDis = document.getElementsByClassName('box-content')[displays];
  createTagDialog = document.createElement('dialog');
  createTagDialog.open = true;
  createTagDialog.style.width = '100%';
  createTagDialog.style.height = '50px';
  createTagDialog.style.color = 'white';
  createTagDialog.style.fontSize = '18px';
  createTagDialog.style.textAlign = 'center';
  createTagDialog.style.lineHeight = '50px';
  createTagDialog.style.background = 'rgba(0,0,0,0.6)'; 
  createTagDialog.style.position = 'absolute';
  createTagDialog.style.top = '235px';
  createTagDialog.style.left = '0';
  createContentDialog = document.createTextNode(contents);
  createTagDialog.appendChild(createContentDialog);
  setTimeout(() => createTagDialog.open = false,3000)
  return accessTagDis.appendChild(createTagDialog);
}