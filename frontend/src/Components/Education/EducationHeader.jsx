import classes from "./EducationHeader.module.css";
import img from "../../assets/educationHeader.jpg";
export default function FrontPage() {
  return (
    <header className={classes.header}>
      <div className={classes.container}>
        <div className={classes.left}>
          <p className={classes.heading_primary}>Taking care of</p>
          <p className={classes.heading_primary}>your health is our</p>
          <p className={classes.heading_primary}>top priority</p>
          <div className={classes.leftdown}>
            <p className={classes.heading_secondary}>
              Being healthy is more than just not getting sick, it entails
              mental,physical
            </p>
            <p className={classes.heading_secondary}>
              and social well being. It's not just about treatment, it's about
              healing.
            </p>
          </div>
        </div>
        {/* <img src={img} className={classes.right} /> */}
      </div>
    </header>
  );
}
