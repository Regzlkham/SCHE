import React, {  useState,  } from 'react';

import { DeleteOutlined } from '@ant-design/icons';
import {  Button, Spin,  Select } from 'antd';


export default function Home() {
  const [loading, setLoadng] = useState(false);
  const [data, setData] = useState([]);
  
  const teachers = [{ name: 'Бат-Математик', id: 1}, { name: 'Анхаа-Математик', id: 2},{ name: 'Од-Монгол хэл', id: 3},{ name: 'Дулам-Физик', id: 4},{ name: 'Санжаа-Физик', id: 5},{ name: 'Дорж-Англи хэл', id: 6}, { name: 'Оюун-Англи хэл', id: 7}, { name: 'Пагма-Уран зохиол', id: 8}, { name: 'Аюуш-Уран зохиол', id: 9}, { name: 'Зулаа-Монгол бичиг', id: 10}, { name: 'Цэрэн-Монгол бичиг', id: 11}, { name: 'Мийгаа-Орос хэл', id: 12}, { name: 'Наран-Мэдээлэл технологи', id: 13}, { name: 'Төмөр-Дизайн технологи', id: 14}, { name: 'Отгоо-хими', id: 15}, { name: 'Ирмүүн-Эрүүл мэнд', id: 16}, { name: 'Сараа-Биологи', id: 17}, { name: 'Төгсөө-Биеийн тамир', id: 18}, { name: 'Соёлоо-Газарзүй', id: 19}, { name: 'Сувд-Түүх', id: 20}, { name: 'Ганаа-Нийгэм', id: 21}, { name: 'Энхээ-Иргэний ёс зүйн боловсрол', id: 22}, { name: 'Баатар-Зураг зүй', id: 23}, { name: 'Цэцэг-Дуу хөгжим', id: 24}];
 
  const classes = [{ name: '1a', id: 1}, { name: '1б', id: 2},{ name: '2а', id: 3},{ name: '2б', id: 4},{ name: '3a', id: 5},{ name: '3б', id: 6}, { name: '4а', id: 7}, { name: '4б', id: 8}, { name: '5а', id: 9}, { name: '5б', id: 10}, { name: '6а', id: 11}, { name: '6б', id: 12}, { name: '7а', id: 13}, { name: '7б', id: 14}, { name: '8а', id: 15}, { name: '8б', id: 16}, { name: '9а', id: 17}, { name: '9б', id: 18}, { name: '10а', id: 19}, { name: '10б', id: 20}, { name: '11а', id: 21}, { name: '11б', id: 22}, { name: '12а', id: 23}, { name: '12б', id: 24}];
  
  const rooms = [{ name: 101, id: 1}, { name: 102, id: 2},{ name: 103, id: 3},{ name: 104, id: 4},{ name: 105, id: 5},{ name: 106, id: 6},{ name: 200, id: 7}, { name: 201, id: 8},{ name:202 , id: 9},{ name: 203, id: 10},{ name: 204, id: 11},{ name: 205, id: 12}];
  
  const weeks = ['Даваа', 'Мягмар', 'Лхагва', 'Пүрэв', 'Баасан' ];
  const column = ['Багш-хичээл', 'Анги-бүлэг'];

  const changeData = (key, index, value) =>{
    console.log(key, index, value)
    var a = [...data];
    a[index][key] = value;
    setData(a);
  }
  const deleteData = (index) =>{
    var a = [...data];
    a.splice(index, 1)
    setData(a);
  }
  const addData = (roomId, weekIndex) => {
    var a = [...data];
    a.push({ room: roomId,  week: weekIndex, teacher: null, class: null })
    setData(a);
  }

  const listData = (d, i, roomId, weekIndex) =>{
    if(weekIndex === d.week && d.room === roomId){
      return  (<tr key={`row${i}-room${roomId}-week${weekIndex}`} >
      <td>
            <Select value={d.teacher} placeholder="багш хичээл" onChange={(e)=>{ changeData("teacher", i, e) }} >
              <Select.Option value={null}>Багш хичээл</Select.Option>
              {teachers.map(teacher=><Select.Option value={teacher.id}>{teacher.name}</Select.Option>)}
            </Select>
      </td>
      <td className="col-6">
      <Select value={d.class} placeholder="анги бүлэг" onChange={(e)=>{ changeData("class", i, e) }} >
          <Select.Option value={null}>Анги бүлэг</Select.Option>
          {classes.map(class1=><Select.Option    value={class1.id}>{class1.name}</Select.Option>)}
      </Select>
      </td>
      <td>
        <Button icon={<DeleteOutlined />} onClick={()=>deleteData(i)} />
      </td>
    </tr>)
    }
  }

  return  !loading ? (<div  className="container mt-3 mb-3">
  {/* {JSON.stringify(data)}   */}
    <div>
  <table  className="table table-bordered" >
      <thead>
          <tr className="bg-primary text-white">
              <th  ></th>
              {weeks.map((week)=><th width="17%" key={`week${week}`} >{week}</th>)}
          </tr>
      </thead>

      <tbody> 
              {rooms.map(room=>(
                    <tr key={`row${room.id}`}>  
                        <td>{room.name}</td>
                        {weeks.map((week, weekIndex)=><td   key={`row${room.id}-${weekIndex}`} >
                            <table className="table">
                              <thead>
                              <tr> <th width="50%">Багш</th><th>Анги</th> </tr>
                                </thead>
                                <tbody>
                            {data && data.map((d, i)=> listData(d,i, room.id, weekIndex) ) }   
                            </tbody>
                            <tfoot>
                              <tr>
                                <td> <Button  className="homeButton" onClick={()=>addData(room.id, weekIndex)}  >Нэмэх</Button></td>
                              </tr>
                            </tfoot>
                            </table>     
                        </td>)}
                      </tr> 
              ))}
      </tbody>
  </table>
  </div>
</div>) : (<div className="container text-center"><Spin /></div>);
}
