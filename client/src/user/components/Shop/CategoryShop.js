const Category = () => {
    return ( 
        <div className="col-lg-3 col-md-5">
        <div className="sidebar">
            <div className="sidebar__item">
                <h4>Department</h4>
                <ul>
                    <li>
                        <a href="#">Fresh Meat</a>
                    </li>
                    <li>
                        <a href="#">Vegetables</a>
                    </li>
                    <li>
                        <a href="#">Fruit &amp; Nut Gifts</a>
                    </li>
                    <li>
                        <a href="#">Fresh Berries</a>
                    </li>
                    <li>
                        <a href="#">Ocean Foods</a>
                    </li>
                    <li>
                        <a href="#">Butter &amp; Eggs</a>
                    </li>
                    <li>
                        <a href="#">Fastfood</a>
                    </li>
                    <li>
                        <a href="#">Fresh Onion</a>
                    </li>
                    <li>
                        <a href="#">Papayaya &amp; Crisps</a>
                    </li>
                    <li>
                        <a href="#">Oatmeal</a>
                    </li>
                </ul>
            </div>
            <div className="sidebar__item sidebar__item__color--option">
                <h4>Colors</h4>
                <div className="sidebar__item__color sidebar__item__color--white">
                    <label htmlFor="white">
                        White
                        <input type="radio" id="white" />
                    </label>
                </div>
                <div className="sidebar__item__color sidebar__item__color--gray">
                    <label htmlFor="gray">
                        Gray
                        <input type="radio" id="gray" />
                    </label>
                </div>
                <div className="sidebar__item__color sidebar__item__color--red">
                    <label htmlFor="red">
                        Red
                        <input type="radio" id="red" />
                    </label>
                </div>
                <div className="sidebar__item__color sidebar__item__color--black">
                    <label htmlFor="black">
                        Black
                        <input type="radio" id="black" />
                    </label>
                </div>
                <div className="sidebar__item__color sidebar__item__color--blue">
                    <label htmlFor="blue">
                        Blue
                        <input type="radio" id="blue" />
                    </label>
                </div>
                <div className="sidebar__item__color sidebar__item__color--green">
                    <label htmlFor="green">
                        Green
                        <input type="radio" id="green" />
                    </label>
                </div>
            </div>
            <div className="sidebar__item">
                <h4>Popular Size</h4>
                <div className="sidebar__item__size">
                    <label htmlFor="large">
                        Large
                        <input type="radio" id="large" />
                    </label>
                </div>
                <div className="sidebar__item__size">
                    <label htmlFor="medium">
                        Medium
                        <input type="radio" id="medium" />
                    </label>
                </div>
                <div className="sidebar__item__size">
                    <label htmlFor="small">
                        Small
                        <input type="radio" id="small" />
                    </label>
                </div>
                <div className="sidebar__item__size">
                    <label htmlFor="tiny">
                        Tiny
                        <input type="radio" id="tiny" />
                    </label>
                </div>
            </div>
            
        </div>
    </div>

     );
}
 
export default Category;