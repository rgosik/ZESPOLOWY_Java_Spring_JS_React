import org.openqa.selenium.*;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Wait;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.util.List;
import java.util.concurrent.TimeUnit;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class Gitlab {

    public WebDriver driver;
    private Wait<WebDriver> wait;

    @FindBy(xpath = "//*[@id=\"root\"]/div/div[1]/div/button")
    private WebElement logins;

    @FindBy(id = "okta-signin-username")
    private WebElement login;

    @FindBy(id = "okta-signin-password")
    private WebElement password;

    @FindBy(id = "okta-signin-submit")
    private WebElement submit;

    @FindBy(xpath = "//*[@id=\"root\"]/div/nav/a[2]\n")
    private WebElement blogs;

    @FindBy(css = "#root > div > div > div > a")
    private WebElement addblog;


    @FindBy(id = "name")
    private WebElement name;

    @FindBy(id = "subject")
    private WebElement subject;

    @FindBy(id = "description")
    private WebElement description;


    public void getDriver(WebDriver driver, String dr){
        this.driver = driver;
        driver.get(dr);
        wait = new WebDriverWait(driver,10);
    }

    public void login(String log, String pas) throws Exception{
        logins.click();
        login.sendKeys(log);
        password.sendKeys(pas);
        submit.click();
        wait.until(ExpectedConditions.titleIs("Me-dev-269180 - Zaloguj"));
    }

    public void click() throws Exception{
        blogs.click();

        //wait.until(ExpectedConditions.titleIs("Me-dev-269180 - Zaloguj"));
    }

    public void login2(String log, String pas, String nam, String sub, String des) throws Exception{
        logins.click();
        login.sendKeys(log);
        password.sendKeys(pas);
        submit.click();
        wait.until(ExpectedConditions.titleIs("Me-dev-269180 - Zaloguj"));
        blogs.click();
        addblog.click();
        name.sendKeys(nam);
        subject.sendKeys(sub);
        description.sendKeys(des);
    }

}
