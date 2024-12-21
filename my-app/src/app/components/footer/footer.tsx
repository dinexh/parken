import './footer.css';
export default function Footer() {  

    function currentYear () {
        return new Date().getFullYear();
    }
    // <footer>
    return(
    <div className="footer-component">
        <div className="footer-component-in">
            <p>&copy;{currentYear()} all Rights Resevered by KLEF Deemed To Be University | Department of EL&GE</p>
        </div>
    </div>
    // </footer>
)
};