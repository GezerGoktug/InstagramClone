
import Button from "./Button";

const NotificationItem = () => {
  return (
    <div className="flex-between">
      <div className="flex items-center gap-2  xxs:gap-4">
        <img className="size-[40px] bg-slate-400 rounded-full" alt="" />
        <div className="text-xs min-[400px]:text-sm">
          <span className="font-semibold">randomuser</span> seni takip etmeye
          başladı
        </div>
      </div>
      <Button className="text-xs xxs:text-sm font-semibold  cursor-pointer bg-blue-500 rounded-lg">
        Follow
      </Button>
    </div>
  );
};

export default NotificationItem;
