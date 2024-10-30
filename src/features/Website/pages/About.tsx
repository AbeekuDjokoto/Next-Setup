import {
  cheerfulFamily,
  fatherHelpingChild,
  handGivingOutKey,
  leadership,
  manInSuit,
  property,
} from '@/assets/images/images';
import { Button, Icon } from '@/components';

export function About() {
  return (
    <div className="">
      <section className="px-4 py-20 flex justify-between gap-[60px]">
        <div className="flex flex-col gap-11">
          <div className="flex flex-col gap-2 max-w-[626px] w-full">
            <p className="text-[72px]">We're Ownkey</p>
            <p className="text-2xl">We make finding a property as easy as turning a key</p>
          </div>
          <Button variant="outline" className="flex gap-2 text-base max-w-[161px] w-full">
            Get Started
            <div className="w-6 h-6 flex justify-between items-center text-[var(--blue)] bg-[var(--red-100)] rounded-full">
              <Icon name="RightArrowWithout" className="w-[3.5px] h-[7px] mx-auto" />
            </div>
          </Button>
        </div>
        <div className="max-w-[626px] w-full">
          <img src={handGivingOutKey} alt="hand giving out key" />
        </div>
      </section>
      <section className="bg-[#06174D] flex justify-between gap-[60px] text-white py-20 px-4">
        <div className="flex flex-col gap-11 max-w-[626px] w-full">
          <div className="flex gap-2 items-center">
            <div className="w-[10px] h-[10px] bg-[var(--red-100)] rounded-full" />
            <p className="text-sm uppercase">What we do</p>
          </div>
          <div className="flex flex-col gap-6">
            <p className="text-[55px]">
              Ownkey <span className="text-[var(--red)]">connects</span> people and properties.
            </p>
            <p className="text-xl font-normal leading-[32px]">
              We believe that searching for a home should be exciting, not exhausting. That's why
              we've created a platform that puts you in control—whether you're buying, renting, or
              just exploring short-stays for a vacation.
            </p>
          </div>
          <Button
            variant="outline-alt"
            className="flex gap-2 text-base max-w-[161px] w-full border-white">
            Find Agents
            <div className="w-6 h-6 flex mx-auto items-center justify-center text-[var(--blue)] bg-[var(--red-100)] rounded-full border border-white">
              <Icon name="RightArrowWithout" />
            </div>
          </Button>
        </div>
        <section className="flex flex-col gap-[120px]">
          <div className="flex flex-col gap-[32px] max-w-[626px] w-full">
            <div>
              <img src={cheerfulFamily} alt="cheerful family" />
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-[28px] text-[var(--red)]">Renters & Buyers</p>
              <p className="text-base font-normal leading-[32px]">
                We believe that searching for a home should be exciting, not exhausting. That's why
                we've created a platform that puts you in control—whether you're buying, renting, or
                just exploring short-stays for a vacation.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-[32px] max-w-[626px] w-full">
            <div>
              <img src={manInSuit} alt="man in suit" />
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-[28px] text-[var(--red)]">Agents</p>
              <p className="text-base font-normal leading-[32px]">
                In a competitive market, standing out is crucial. Ownkey gives you a winning edge
                with powerful tools that not only showcase your listings but also connect you with
                serious buyers and renters who are ready to move. Ownkey ‘s tailored marketing
                solutions are designed to highlight your properties, boost your visibility, and
                close deals faster. Don’t just be another agent—be the go-to expert with Ownkey.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-[32px] max-w-[626px] w-full">
            <div>
              <img src={property} alt="property" />
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-[28px] text-[var(--red)]">Developers</p>
              <p className="text-base font-normal leading-[32px]">
                Every project you build is a step toward transforming communities and creating
                lasting value. Ownkey is your partner in maximizing that impact. Ownkey connects you
                with motivated buyers and renters who are actively searching for homes like yours.
                With in-depth market insights and targeted advertising, we ensure your developments
                are seen by the right people at the right time. Invest in your success with Ownkey,
                and watch your projects flourish.
              </p>
            </div>
          </div>
        </section>
      </section>
      <section className="py-20 px-4 flex flex-col gap-11">
        <div className="w-full">
          <img src={fatherHelpingChild} alt="father helping child" className="w-full" />
        </div>
        <div className="flex justify-between gap-[60px]">
          <div className="flex flex-col gap-11">
            <div className="flex gap-2 items-center">
              <div className="w-[10px] h-[10px] bg-[var(--red-100)] rounded-full" />
              <p className="text-sm uppercase">our aim</p>
            </div>
            <div className="flex flex-col gap-2 max-w-[626px] w-full">
              <p className="text-[64px] font-normal">Turning Dreams into Addresses</p>
              <p className="text-2xl font-normal">
                Ownkey is Ghana's Modern Real Estate Listing Site
              </p>
            </div>
            <Button variant="outline" className="flex gap-2 text-base max-w-[161px] w-full">
              Get Started
              <div className="w-6 h-6 flex justify-between items-center text-[var(--blue)] bg-[var(--red-100)] rounded-full">
                <Icon name="RightArrowWithout" className="w-[3.5px] h-[7px] mx-auto" />
              </div>
            </Button>
          </div>
          <div className="max-w-[626px] w-full text-[var(--black-100)] flex flex-col gap-6 text-2xl font-normal">
            <p>
              Our journey began with a simple idea: to make the real estate process smoother,
              faster, and more exciting for everyone.
            </p>
            <p>
              We aim to take the stress out of the equation, leaving you with a straightforward,
              transparent experience that amplifies your joy in finding the best place.
            </p>
            <p>
              We are committed to transforming the real estate journey by combining smart technology
              with a deep understanding of what truly matters to home seekers.
            </p>
            <p>
              From first-time homebuyers to seasoned investors, Ownkey is Ghana's modern real estate
              platform to meet your needs.
            </p>
          </div>
        </div>
      </section>
      <section className="py-20 px-4 flex flex-col gap-11">
        <div className="flex flex-col gap-11">
          <div className="flex gap-2 items-center">
            <div className="w-[10px] h-[10px] bg-[var(--red-100)] rounded-full" />
            <p className="text-sm uppercase">leadership</p>
          </div>
          <div className="flex flex-col gap-2 max-w-[626px] w-full">
            <p className="text-[64px] font-normal">
              Meet our <span className="text-[var(--red)]">leadership team.</span>
            </p>
          </div>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(401px,1fr))] gap-8">
          <div className="flex flex-col gap-8">
            <img src={leadership} alt="leadership" />
            <div className="flex flex-col gap-[11px]">
              <p className="text-[28px]">Damon Joshua</p>
              <p className="text-base">President</p>
            </div>
          </div>
          <div className="flex flex-col gap-8 ">
            <img src={leadership} alt="leadership" />
            <div className="flex flex-col gap-[11px]">
              <p className="text-[28px]">Damon Joshua</p>
              <p className="text-base">President</p>
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <img src={leadership} alt="leadership" />
            <div className="flex flex-col gap-[11px]">
              <p className="text-[28px]">Damon Joshua</p>
              <p className="text-base">President</p>
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <img src={leadership} alt="leadership" />
            <div className="flex flex-col gap-[11px]">
              <p className="text-[28px]">Damon Joshua</p>
              <p className="text-base">President</p>
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <img src={leadership} alt="leadership" />
            <div className="flex flex-col gap-[11px]">
              <p className="text-[28px]">Damon Joshua</p>
              <p className="text-base">President</p>
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <img src={leadership} alt="leadership" />
            <div className="flex flex-col gap-[11px]">
              <p className="text-[28px]">Damon Joshua</p>
              <p className="text-base">President</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
