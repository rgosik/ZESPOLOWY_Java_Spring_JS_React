import org.junit.*;
import org.junit.runners.MethodSorters;
import org.openqa.selenium.Alert;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.interactions.Action;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.support.PageFactory;

import java.util.concurrent.TimeUnit;

import static org.bouncycastle.asn1.iana.IANAObjectIdentifiers.security;
import static org.hamcrest.CoreMatchers.containsString;//import
import static org.hamcrest.CoreMatchers.not;
import static org.junit.jupiter.api.Assertions.assertEquals;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class ChromeTest {

    private static WebDriver driver;
    public Gitlab gitlab;

    @BeforeClass
    public static void setUp() throws Exception {
        System.setProperty("webdriver.gecko.driver", "resources/geckodriver");
        driver = new ChromeDriver();
        //driver.setPreference("security.fileuri.strict_origin_policy", false);
        //driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
    }



    @Test
    public void asuccessfulLogin() throws Exception{
        driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);//implicitly
        gitlab = PageFactory.initElements(driver, Gitlab.class);
        gitlab.getDriver(driver, "http://localhost:3000/");
        gitlab.login("qwerty123", "Oktaokta1");
        assertEquals("Blog App", driver.getTitle());
    }





    @Test
    public void bunsuccessfulLogin() throws Exception{
        driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);//implicitly
        gitlab = PageFactory.initElements(driver, Gitlab.class);
        gitlab.getDriver(driver, "http://localhost:3000/");
        gitlab.click();
        String text = driver.findElement(By.cssSelector("#root > div > div > h3")).getText();
        assertEquals("Blog list", text);
    }




//    @Test
//    public void asuccessfulLoginAndAdd() throws Exception{
//        driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);//implicitly
//        gitlab = PageFactory.initElements(driver, Gitlab.class);
//        gitlab.getDriver(driver, "http://localhost:3000/");
//        gitlab.login2("qwerty123", "Oktaokta1", "testing", "testing", "testing");
//        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div/form/div[4]/button")).click();
//        String text = driver.findElement(By.cssSelector("#root > div > div > h3")).getText();
//
//        assertEquals("Blog list", text);
//       // assertEquals("Blog App", driver.getTitle());
//
//
//    }

    @AfterClass
    public static void tearDown() throws Exception {
        driver.quit();
    }


}
