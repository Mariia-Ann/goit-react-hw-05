import style from "./NotFoundPage.module.css";
const NotFoundPage = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.card}>
        <img
          src="https://i.imgur.com/A040Lxr.png"
          alt="Space"
          className={style.img}
        />
        <h3 className={style.title}>This Page is Lost in Space</h3>
        <p className={style.text}>
          You thought this mission to the moon would be a quick six month thing.
          Your neighbor offered to look after your dog. Your high school math
          teacher was impressed. He once said you wouldn’t amount to
          anything.You sure showed him. But now here you are, fifty feet from
          your spaceship with no way to get back. Your dog will be so sad. Your
          math teacher will be so smug. Pretty devastating.
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
