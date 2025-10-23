import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  AlertTriangle,
  Siren,
  MapPin,
  Users,
  Shield,
  Activity,
  Smartphone,
  Globe,
  BellRing,
  CheckCircle,
} from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AppHero.css";

import carAccident from "./car-accident.jpg";
import fireEmergency from "./fire-emergency.jpg";
import communityHelp from "./community-safety.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.8, ease: "easeOut" },
  }),
};

const AppHero = () => {
  const navigate = useNavigate();

  const features = [
    {
      id: 1,
      title: "Report Incidents",
      icon: <Siren size={40} />,
      description:
        "Instantly report accidents, fires, or emergencies with photos and location.",
      image: carAccident,
      delay: 0.2,
    },
    {
      id: 2,
      title: "Real-Time Alerts",
      icon: <AlertTriangle size={40} />,
      description:
        "Get notified the moment an incident is reported near you.",
      image: fireEmergency,
      delay: 0.4,
    },
    {
      id: 3,
      title: "Community Safety",
      icon: <Users size={40} />,
      description:
        "See live reports from your area and help keep your community safe.",
      image: communityHelp,
      delay: 0.6,
    },
  ];

  return (
    <div className="hero-container text-white position-relative overflow-hidden">
      {/* Background Gradient Animation */}
      <div className="animated-bg"></div>

      {/* Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="navbar navbar-expand-lg navbar-dark glass-nav px-4 py-3 fixed-top"
      >
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-2">
            <Activity className="text-danger" size={28} />
            <h1 className="fw-bold mb-0 gradient-text">PulseStream</h1>
          </div>

          <div className="d-none d-md-flex gap-4">
            <Link to="/feed" className="nav-link text-light fw-semibold">
              Feed
            </Link>
            <Link to="/report" className="nav-link text-light fw-semibold">
              Report
            </Link>
            <Link to="/profile" className="nav-link text-light fw-semibold">
              Profile
            </Link>
            <Link to="/about" className="nav-link text-light fw-semibold">
              About
            </Link>
          </div>

          <Link
            to="/login"
            className="btn btn-danger rounded-pill fw-bold px-4 py-2 text-decoration-none"
          >
            Login
          </Link>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <div className="container text-center py-5" style={{ paddingTop: "7rem" }}>
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="display-3 fw-bold mb-4"
        >
          Safety in <span className="gradient-text">Real Time</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="lead text-light mb-5"
        >
          Report emergencies, receive instant alerts, and protect your community
          — all in one secure platform.
        </motion.p>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="d-flex flex-column flex-sm-row justify-content-center gap-3 mb-5"
        >
          <Link
            to="/report"
            className="btn btn-danger btn-lg rounded-pill px-5 fw-bold pulse-glow d-flex align-items-center justify-content-center gap-2 text-decoration-none"
          >
            <Siren size={22} /> Report Now
          </Link>

          {/* ✅ View Live Map now navigates to Feed page */}
          <button
            onClick={() => navigate("/feed")}
            className="btn btn-outline-light btn-lg rounded-pill px-5 fw-semibold hover-bright"
          >
            View Live Map
          </button>
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="container py-5">
        <div className="row g-4">
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              className="col-md-4"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={feature.delay}
            >
              <div className="card feature-card h-100 text-white border-0 overflow-hidden">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="card-img feature-bg"
                />
                <div className="card-img-overlay d-flex flex-column justify-content-end p-4 bg-gradient-dark">
                  <div className="mb-3">{feature.icon}</div>
                  <h5 className="fw-bold">{feature.title}</h5>
                  <p className="small">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 📊 Community Impact Section */}
      <motion.section
        className="py-5 bg-dark text-center"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="container">
          <h2 className="fw-bold display-5 mb-4 gradient-text">
            Empowering Safer Communities
          </h2>
          <p className="text-light lead mb-5">
            PulseStream has helped thousands of citizens report, respond, and stay safe in real time.
          </p>
          <div className="row text-center">
            {[
              { num: "10,000+", label: "Emergencies Reported", color: "text-warning" },
              { num: "25+", label: "Communities Connected", color: "text-danger" },
              { num: "99%", label: "Response Success Rate", color: "text-info" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="col-md-4 mb-4"
                variants={fadeUp}
                custom={i * 0.2}
              >
                <h3 className={`${stat.color} fw-bold display-6`}>{stat.num}</h3>
                <p>{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ⚙️ How It Works Section */}
      <motion.section
        className="py-5 bg-gradient-dark"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="container text-center">
          <h2 className="fw-bold display-5 mb-5 gradient-text">How It Works</h2>
          <div className="row g-4">
            {[
              {
                icon: <Smartphone size={50} className="text-danger" />,
                title: "1. Report Instantly",
                desc: "Open the app, select the type of emergency, and upload photos or details.",
              },
              {
                icon: <BellRing size={50} className="text-warning" />,
                title: "2. Receive Alerts",
                desc: "Nearby users and emergency services are instantly notified in real time.",
              },
              {
                icon: <CheckCircle size={50} className="text-success" />,
                title: "3. Stay Safe",
                desc: "Follow live updates, track responders, and stay connected with your community.",
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                className="col-md-4"
                variants={fadeUp}
                custom={i * 0.3}
              >
                <div className="card bg-transparent border-0 text-light">
                  <div className="mb-4">{step.icon}</div>
                  <h5 className="fw-bold mb-3">{step.title}</h5>
                  <p>{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 🚀 CTA Section */}
      <motion.section
        className="py-5 text-center cta-section"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="container py-5">
          <h2 className="display-5 fw-bold mb-4">
            Join the Movement for Safer Communities
          </h2>
          <p className="lead mb-5">
            Be part of a real-time safety network that saves lives every day.
          </p>

          {/* ✅ Get Started now links to Register page */}
          <Link
            to="/register"
            className="btn btn-lg btn-warning text-dark fw-bold rounded-pill px-5"
          >
            Get Started
          </Link>
        </div>
      </motion.section>

      {/* 🌍 Footer */}
      <footer className="py-4 bg-black text-center text-light small">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-1"
        >
          &copy; {new Date().getFullYear()} PulseStream. All rights reserved.
        </motion.p>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Globe size={16} className="me-2 text-danger" />
          Built with ❤️ for a safer world.
        </motion.p>
      </footer>
    </div>
  );
};

export default AppHero;
