import Title from '../../components/Title';
import './AboutPage.css';

function AboutPage() {
  return (
    <>
      <Title mainText="Welcome to BCard!" />
      <div className="container">
        <div className="top">
          <h3 className="top-text">
            At BCard,
            <br />
            we are dedicated to providing you with a seamless and convenient
            experience when it comes to exploring and discovering local
            businesses. Our goal is to connect you with the best businesses in
            your area, making it easier for you to make informed decisions and
            have exceptional experiences.
          </h3>
        </div>
        <hr />
        <div className="d-flex justify-content-center py-3">
          <img
            src="https://www.xero.com/content/dam/xero/pilot-images/guides/business-trends/biz-trends-header.1646877613184.svg"
            alt="businesses"
            width={500}
          />
        </div>
        <h5>Our Mission:</h5>
        <p>
          We are on a mission to empower individuals like you by providing a
          reliable platform where you can easily find and engage with local
          businesses. Our aim is to enhance the way you discover new places,
          products, and services, enabling you to make the most out of your
          local community.
        </p>
        <h5>Discover Local Gems:</h5>
        <p>
          With BCard, you can uncover hidden gems, popular hotspots, and
          everything in between. Our powerful search and recommendation
          algorithms take into account your preferences, location, and reviews
          from the community to bring you personalized recommendations that
          match your interests.
        </p>
        <h5>Business Listings and Reviews:</h5>
        <p>
          We strive to provide accurate and comprehensive business listings to
          help you make informed choices. Our platform features detailed
          information about businesses, including contact details, operating
          hours, pricing, and more. Additionally, you can rely on the feedback
          from our vibrant community of users who leave honest reviews and
          ratings to guide your decision-making process.
        </p>
        <h5>Create and Share Experiences:</h5>
        <p>
          BCard is more than just a directory; it's a place for you to document
          and share your experiences. You can create and curate lists of your
          favorite businesses, leave reviews, upload photos, and share your
          recommendations with friends and fellow app users. Join the community,
          contribute your insights, and help others discover the best local
          businesses.
        </p>
        <h5>Connect with Businesses:</h5>
        <p>
          We understand the importance of seamless communication between
          businesses and their customers. That's why we offer features that
          allow you to directly connect with businesses within the app. Whether
          you want to make a reservation, ask a question, or request a service,
          you can easily get in touch with businesses and receive prompt
          responses.
        </p>
        <h5>Your Privacy and Security:</h5>
        <p>
          At BCard, we prioritize your privacy and data security. We have
          implemented robust measures to safeguard your personal information and
          ensure a safe browsing experience. Rest assured that your data is
          handled with utmost care and used only to enhance your app experience.
        </p>
        <h5>Get Started:</h5>
        <p>
          Download BCard today and embark on a journey of discovery. Whether
          you're looking for a cozy café, a trustworthy mechanic, or the latest
          fashion trends, our app is here to guide you every step of the way.
          Join the vibrant community of users and let's support local businesses
          together.
        </p>
        <h5>
          Thank you for choosing BCard.
          <br /> We appreciate your trust and look forward to being your go-to
          app for all your business needs.
          <hr />
        </h5>
      </div>
    </>
  );
}

export default AboutPage;
