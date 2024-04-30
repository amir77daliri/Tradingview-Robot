import { toast } from "react-toastify";
import { Howl } from "howler";
import { timeConverter } from "./dateConverter";
import notif from '../assets/notif.mp3'

const makeNotif = (item) => {
 // implement notification
 let sound = new Howl({
    src: [notif],
    autoplay: true,
    loop: false,
    volume: 1,
    onend: function () {
      toast.success(
        `ارز با نام ${item.name} در تاریخ ${timeConverter(
          item.lastNotifedDate / 1000
        )} به قیمت هدف ${item.Base_Line} رسید.`
      );
    },
  });   
}

export default makeNotif