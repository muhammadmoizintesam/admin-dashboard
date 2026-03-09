'use client';

import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoggedIn, isLoading: authLoading } = useAuth();
  const [isLoading, setIsLoading] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [signupEmail, setSignupEmail] = React.useState('');
  const [signupUsername, setSignupUsername] = React.useState('');
  const [signupPassword, setSignupPassword] = React.useState('');
  const [confirmTerms, setConfirmTerms] = React.useState(false);
  const [loginUsername, setLoginUsername] = React.useState('');
  const [loginPassword, setLoginPassword] = React.useState('');

  const [currentView, setCurrentView] = React.useState<'login' | 'signup'>('login');

  const slideBoxRef = useRef<HTMLDivElement>(null);
  const topLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!authLoading && isLoggedIn) {
      router.push('/');
    }
  }, [isLoggedIn, authLoading, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const success = await login(loginUsername, loginPassword);
    if (success) {
      router.push('/');
    }
    setIsLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle signup logic here
    console.log('Signup:', { signupEmail, signupUsername, signupPassword, confirmTerms });
  };

  const slideToSignup = () => {
    setCurrentView('signup');
    if (slideBoxRef.current && topLayerRef.current) {
      slideBoxRef.current.style.transition = 'margin-left 0.6s ease';
      topLayerRef.current.style.transition = 'margin-left 0.6s ease';
      slideBoxRef.current.style.marginLeft = '0%';
      topLayerRef.current.style.marginLeft = '100%';
    }
  };

  const slideToLogin = () => {
    setCurrentView('login');
    if (slideBoxRef.current && topLayerRef.current) {
      slideBoxRef.current.style.transition = 'margin-left 0.6s ease';
      topLayerRef.current.style.transition = 'margin-left 0.6s ease';
      if (typeof window !== 'undefined' && window.innerWidth > 769) {
        slideBoxRef.current.style.marginLeft = '50%';
      } else {
        slideBoxRef.current.style.marginLeft = '20%';
      }
    }
  };

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,600');
        
        body {
          margin: 0;
          height: 100%;
          overflow: hidden;
          width: 100% !important;
          box-sizing: border-box;
          font-family: "Roboto", sans-serif;
        }

        .backRight {
          position: absolute;
          right: 0;
          width: 50%;
          height: 100%;
          background: #03A9F4;
        }

        .backLeft {
          position: absolute;
          left: 0;
          width: 50%;
          height: 100%;
          background: #673AB7;
        }

        #back {
          width: 100%;
          height: 100%;
          position: absolute;
          z-index: -999;
        }

        .animated-shapes {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 10;
          overflow: hidden;
        }

        .shape {
          position: absolute;
          border: 2px solid rgba(255, 255, 255, 0.5);
          animation: float-rotate 30s infinite ease-in-out;
          transition: transform 0.3s ease, width 0.3s ease, height 0.3s ease, opacity 0.3s ease;
          cursor: pointer;
        }

        .shape:hover {
          transform: scale(1.25) !important;
          z-index: 100;
          border-color: rgba(255, 255, 255, 0.8);
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.6);
        }

        .shape:hover ~ .shape {
          opacity: 0.3;
          transform: scale(0.8);
        }

        .shape1 {
          width: 56px;
          height: 56px;
          top: 5%;
          left: 8%;
          transform: rotate(0deg);
          border-radius: 5%;
          animation-delay: 0s;
          animation-duration: 22s;
        }

        .shape2 {
          width: 150px;
          height: 150px;
          top: 12%;
          left: 75%;
          transform: rotate(45deg);
          border-radius: 50%;
          animation-delay: 0.5s;
          animation-duration: 25s;
        }

        .shape3 {
          width: 81px;
          height: 81px;
          top: 22%;
          left: 18%;
          transform: rotate(30deg);
          border-radius: 0%;
          animation-delay: 1s;
          animation-duration: 20s;
        }

        .shape4 {
          width: 113px;
          height: 113px;
          top: 35%;
          left: 82%;
          transform: rotate(60deg);
          border-radius: 25%;
          animation-delay: 1.5s;
          animation-duration: 28s;
        }

        .shape5 {
          width: 94px;
          height: 94px;
          top: 48%;
          left: 28%;
          transform: rotate(90deg);
          border-radius: 50%;
          animation-delay: 2s;
          animation-duration: 23s;
        }

        .shape6 {
          width: 69px;
          height: 69px;
          top: 58%;
          left: 52%;
          transform: rotate(15deg);
          border-radius: 15%;
          animation-delay: 2.5s;
          animation-duration: 21s;
        }

        .shape7 {
          width: 131px;
          height: 131px;
          top: 68%;
          left: 65%;
          transform: rotate(75deg);
          border-radius: 40%;
          animation-delay: 3s;
          animation-duration: 26s;
        }

        .shape8 {
          width: 88px;
          height: 88px;
          top: 78%;
          left: 15%;
          transform: rotate(120deg);
          border-radius: 0%;
          animation-delay: 3.5s;
          animation-duration: 24s;
        }

        .shape9 {
          width: 106px;
          height: 106px;
          top: 8%;
          left: 88%;
          transform: rotate(105deg);
          border-radius: 30%;
          animation-delay: 4s;
          animation-duration: 22s;
        }

        .shape10 {
          width: 75px;
          height: 75px;
          top: 18%;
          left: 68%;
          transform: rotate(135deg);
          border-radius: 50%;
          animation-delay: 4.5s;
          animation-duration: 19s;
        }

        .shape11 {
          width: 119px;
          height: 119px;
          top: 28%;
          left: 38%;
          transform: rotate(165deg);
          border-radius: 20%;
          animation-delay: 5s;
          animation-duration: 27s;
        }

        .shape12 {
          width: 63px;
          height: 63px;
          top: 38%;
          left: 78%;
          transform: rotate(195deg);
          border-radius: 35%;
          animation-delay: 5.5s;
          animation-duration: 21s;
        }

        .shape13 {
          width: 138px;
          height: 138px;
          top: 52%;
          left: 42%;
          transform: rotate(225deg);
          border-radius: 45%;
          animation-delay: 6s;
          animation-duration: 25s;
        }

        .shape14 {
          width: 60px;
          height: 60px;
          top: 62%;
          left: 25%;
          transform: rotate(255deg);
          border-radius: 10%;
          animation-delay: 6.5s;
          animation-duration: 18s;
        }

        .shape15 {
          width: 156px;
          height: 156px;
          top: 72%;
          left: 58%;
          transform: rotate(285deg);
          border-radius: 50%;
          animation-delay: 7s;
          animation-duration: 29s;
        }

        .shape16 {
          width: 90px;
          height: 90px;
          top: 82%;
          left: 12%;
          transform: rotate(315deg);
          border-radius: 25%;
          animation-delay: 7.5s;
          animation-duration: 23s;
        }

        .shape17 {
          width: 73px;
          height: 73px;
          top: 92%;
          left: 85%;
          transform: rotate(345deg);
          border-radius: 15%;
          animation-delay: 8s;
          animation-duration: 26s;
        }

        .shape18 {
          width: 110px;
          height: 110px;
          top: 15%;
          left: 45%;
          transform: rotate(30deg);
          border-radius: 40%;
          animation-delay: 8.5s;
          animation-duration: 20s;
        }

        .shape19 {
          width: 78px;
          height: 78px;
          top: 25%;
          left: 35%;
          transform: rotate(150deg);
          border-radius: 30%;
          animation-delay: 9s;
          animation-duration: 24s;
        }

        .shape20 {
          width: 123px;
          height: 123px;
          top: 42%;
          left: 72%;
          transform: rotate(270deg);
          border-radius: 20%;
          animation-delay: 9.5s;
          animation-duration: 28s;
        }

        .shape21 {
          width: 50px;
          height: 50px;
          top: 55%;
          left: 5%;
          transform: rotate(210deg);
          border-radius: 8%;
          animation-delay: 10s;
          animation-duration: 19s;
        }

        .shape22 {
          width: 163px;
          height: 163px;
          top: 65%;
          left: 92%;
          transform: rotate(240deg);
          border-radius: 60%;
          animation-delay: 10.5s;
          animation-duration: 30s;
        }

        .shape23 {
          width: 65px;
          height: 65px;
          top: 75%;
          left: 32%;
          transform: rotate(300deg);
          border-radius: 12%;
          animation-delay: 11s;
          animation-duration: 22s;
        }

        .shape24 {
          width: 98px;
          height: 98px;
          top: 85%;
          left: 62%;
          transform: rotate(330deg);
          border-radius: 28%;
          animation-delay: 11.5s;
          animation-duration: 25s;
        }

        .shape25 {
          width: 115px;
          height: 115px;
          top: 2%;
          left: 22%;
          transform: rotate(18deg);
          border-radius: 38%;
          animation-delay: 12s;
          animation-duration: 27s;
        }

        .shape26 {
          width: 58px;
          height: 58px;
          top: 32%;
          left: 8%;
          transform: rotate(72deg);
          border-radius: 6%;
          animation-delay: 12.5s;
          animation-duration: 21s;
        }

        .shape27 {
          width: 135px;
          height: 135px;
          top: 45%;
          left: 95%;
          transform: rotate(108deg);
          border-radius: 55%;
          animation-delay: 13s;
          animation-duration: 29s;
        }

        .shape28 {
          width: 68px;
          height: 68px;
          top: 56%;
          left: 48%;
          transform: rotate(144deg);
          border-radius: 14%;
          animation-delay: 13.5s;
          animation-duration: 23s;
        }

        .shape29 {
          width: 103px;
          height: 103px;
          top: 67%;
          left: 28%;
          transform: rotate(180deg);
          border-radius: 32%;
          animation-delay: 14s;
          animation-duration: 26s;
        }

        .shape30 {
          width: 55px;
          height: 55px;
          top: 77%;
          left: 78%;
          transform: rotate(216deg);
          border-radius: 4%;
          animation-delay: 14.5s;
          animation-duration: 20s;
        }

        .shape31 {
          width: 144px;
          height: 144px;
          top: 88%;
          left: 18%;
          transform: rotate(252deg);
          border-radius: 48%;
          animation-delay: 15s;
          animation-duration: 31s;
        }

        .shape32 {
          width: 70px;
          height: 70px;
          top: 98%;
          left: 55%;
          transform: rotate(288deg);
          border-radius: 16%;
          animation-delay: 15.5s;
          animation-duration: 24s;
        }

        .shape33 {
          width: 93px;
          height: 93px;
          top: 7%;
          left: 32%;
          transform: rotate(324deg);
          border-radius: 26%;
          animation-delay: 16s;
          animation-duration: 28s;
        }

        .shape34 {
          width: 108px;
          height: 108px;
          top: 17%;
          left: 58%;
          transform: rotate(36deg);
          border-radius: 36%;
          animation-delay: 16.5s;
          animation-duration: 22s;
        }

        .shape35 {
          width: 53px;
          height: 53px;
          top: 27%;
          left: 12%;
          transform: rotate(84deg);
          border-radius: 2%;
          animation-delay: 17s;
          animation-duration: 19s;
        }

        .shape36 {
          width: 125px;
          height: 125px;
          top: 37%;
          left: 85%;
          transform: rotate(126deg);
          border-radius: 42%;
          animation-delay: 17.5s;
          animation-duration: 30s;
        }

        .shape37 {
          width: 80px;
          height: 80px;
          top: 47%;
          left: 22%;
          transform: rotate(168deg);
          border-radius: 18%;
          animation-delay: 18s;
          animation-duration: 25s;
        }

        .shape38 {
          width: 95px;
          height: 95px;
          top: 57%;
          left: 92%;
          transform: rotate(198deg);
          border-radius: 22%;
          animation-delay: 18.5s;
          animation-duration: 27s;
        }

        .shape39 {
          width: 118px;
          height: 118px;
          top: 70%;
          left: 52%;
          transform: rotate(234deg);
          border-radius: 34%;
          animation-delay: 19s;
          animation-duration: 29s;
        }

        .shape40 {
          width: 48px;
          height: 48px;
          top: 80%;
          left: 8%;
          transform: rotate(264deg);
          border-radius: 0%;
          animation-delay: 19.5s;
          animation-duration: 21s;
        }

        .shape41 {
          width: 140px;
          height: 140px;
          top: 90%;
          left: 75%;
          transform: rotate(294deg);
          border-radius: 46%;
          animation-delay: 20s;
          animation-duration: 32s;
        }

        .shape42 {
          width: 85px;
          height: 85px;
          top: 3%;
          left: 42%;
          transform: rotate(318deg);
          border-radius: 24%;
          animation-delay: 20.5s;
          animation-duration: 23s;
        }

        .shape43 {
          width: 100px;
          height: 100px;
          top: 13%;
          left: 68%;
          transform: rotate(342deg);
          border-radius: 28%;
          animation-delay: 21s;
          animation-duration: 26s;
        }

        .shape44 {
          width: 65px;
          height: 65px;
          top: 23%;
          left: 28%;
          transform: rotate(24deg);
          border-radius: 12%;
          animation-delay: 21.5s;
          animation-duration: 20s;
        }

        .shape45 {
          width: 120px;
          height: 120px;
          top: 33%;
          left: 88%;
          transform: rotate(66deg);
          border-radius: 40%;
          animation-delay: 22s;
          animation-duration: 28s;
        }

        .shape46 {
          width: 60px;
          height: 60px;
          top: 43%;
          left: 18%;
          transform: rotate(96deg);
          border-radius: 8%;
          animation-delay: 22.5s;
          animation-duration: 24s;
        }

        .shape47 {
          width: 130px;
          height: 130px;
          top: 53%;
          left: 62%;
          transform: rotate(132deg);
          border-radius: 44%;
          animation-delay: 23s;
          animation-duration: 31s;
        }

        .shape48 {
          width: 83px;
          height: 83px;
          top: 63%;
          left: 32%;
          transform: rotate(162deg);
          border-radius: 20%;
          animation-delay: 23.5s;
          animation-duration: 25s;
        }

        .shape49 {
          width: 105px;
          height: 105px;
          top: 73%;
          left: 82%;
          transform: rotate(192deg);
          border-radius: 32%;
          animation-delay: 24s;
          animation-duration: 29s;
        }

        .shape50 {
          width: 45px;
          height: 45px;
          top: 83%;
          left: 48%;
          transform: rotate(222deg);
          border-radius: 0%;
          animation-delay: 24.5s;
          animation-duration: 22s;
        }

        .shape51 {
          width: 58px;
          height: 58px;
          top: 6%;
          left: 25%;
          transform: rotate(18deg);
          border-radius: 12%;
          animation-delay: 25s;
          animation-duration: 23s;
        }

        .shape52 {
          width: 142px;
          height: 142px;
          top: 16%;
          left: 88%;
          transform: rotate(54deg);
          border-radius: 48%;
          animation-delay: 25.5s;
          animation-duration: 30s;
        }

        .shape53 {
          width: 67px;
          height: 67px;
          top: 26%;
          left: 12%;
          transform: rotate(90deg);
          border-radius: 8%;
          animation-delay: 26s;
          animation-duration: 21s;
        }

        .shape54 {
          width: 95px;
          height: 95px;
          top: 36%;
          left: 72%;
          transform: rotate(126deg);
          border-radius: 32%;
          animation-delay: 26.5s;
          animation-duration: 27s;
        }

        .shape55 {
          width: 73px;
          height: 73px;
          top: 46%;
          left: 38%;
          transform: rotate(162deg);
          border-radius: 18%;
          animation-delay: 27s;
          animation-duration: 24s;
        }

        .shape56 {
          width: 108px;
          height: 108px;
          top: 56%;
          left: 82%;
          transform: rotate(198deg);
          border-radius: 38%;
          animation-delay: 27.5s;
          animation-duration: 29s;
        }

        .shape57 {
          width: 52px;
          height: 52px;
          top: 66%;
          left: 22%;
          transform: rotate(234deg);
          border-radius: 6%;
          animation-delay: 28s;
          animation-duration: 20s;
        }

        .shape58 {
          width: 125px;
          height: 125px;
          top: 76%;
          left: 68%;
          transform: rotate(270deg);
          border-radius: 42%;
          animation-delay: 28.5s;
          animation-duration: 31s;
        }

        .shape59 {
          width: 61px;
          height: 61px;
          top: 86%;
          left: 42%;
          transform: rotate(306deg);
          border-radius: 14%;
          animation-delay: 29s;
          animation-duration: 25s;
        }

        .shape60 {
          width: 88px;
          height: 88px;
          top: 96%;
          left: 8%;
          transform: rotate(342deg);
          border-radius: 28%;
          animation-delay: 29.5s;
          animation-duration: 26s;
        }

        .shape61 {
          width: 71px;
          height: 71px;
          top: 4%;
          left: 58%;
          transform: rotate(24deg);
          border-radius: 16%;
          animation-delay: 30s;
          animation-duration: 22s;
        }

        .shape62 {
          width: 134px;
          height: 134px;
          top: 14%;
          left: 92%;
          transform: rotate(60deg);
          border-radius: 52%;
          animation-delay: 30.5s;
          animation-duration: 32s;
        }

        .shape63 {
          width: 49px;
          height: 49px;
          top: 24%;
          left: 32%;
          transform: rotate(96deg);
          border-radius: 4%;
          animation-delay: 31s;
          animation-duration: 19s;
        }

        .shape64 {
          width: 102px;
          height: 102px;
          top: 34%;
          left: 78%;
          transform: rotate(132deg);
          border-radius: 36%;
          animation-delay: 31.5s;
          animation-duration: 28s;
        }

        .shape65 {
          width: 76px;
          height: 76px;
          top: 44%;
          left: 18%;
          transform: rotate(168deg);
          border-radius: 20%;
          animation-delay: 32s;
          animation-duration: 24s;
        }

        .shape66 {
          width: 118px;
          height: 118px;
          top: 54%;
          left: 62%;
          transform: rotate(204deg);
          border-radius: 44%;
          animation-delay: 32.5s;
          animation-duration: 30s;
        }

        .shape67 {
          width: 54px;
          height: 54px;
          top: 64%;
          left: 28%;
          transform: rotate(240deg);
          border-radius: 10%;
          animation-delay: 33s;
          animation-duration: 21s;
        }

        .shape68 {
          width: 96px;
          height: 96px;
          top: 74%;
          left: 88%;
          transform: rotate(276deg);
          border-radius: 30%;
          animation-delay: 33.5s;
          animation-duration: 27s;
        }

        .shape69 {
          width: 64px;
          height: 64px;
          top: 84%;
          left: 52%;
          transform: rotate(312deg);
          border-radius: 22%;
          animation-delay: 34s;
          animation-duration: 25s;
        }

        .shape70 {
          width: 112px;
          height: 112px;
          top: 94%;
          left: 12%;
          transform: rotate(348deg);
          border-radius: 40%;
          animation-delay: 34.5s;
          animation-duration: 29s;
        }

        @keyframes float-rotate {
          0% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-50px) translateX(25px) rotate(90deg);
          }
          50% {
            transform: translateY(0px) translateX(-25px) rotate(180deg);
          }
          75% {
            transform: translateY(50px) translateX(35px) rotate(270deg);
          }
          100% {
            transform: translateY(0px) translateX(0px) rotate(360deg);
          }
        }

        #slideBox {
          width: 50%;
          max-height: 100%;
          height: 100%;
          overflow: hidden;
          margin-left: 50%;
          position: absolute;
          box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
        }

        .topLayer {
          width: 200%;
          height: 100%;
          position: relative;
          left: 0;
          margin-left: -100%;
        }

        label {
          font-size: 0.8em;
          text-transform: uppercase;
        }

        input {
          background-color: transparent;
          border: 0;
          outline: 0;
          font-size: 1em;
          padding: 8px 1px;
          margin-top: 0.1em;
        }

        .left {
          width: 50%;
          height: 100%;
          overflow: scroll;
          background: #2C3034;
          left: 0;
          position: absolute;
        }
        .left label {
          color: #e3e3e3;
        }
        .left input {
          border-bottom: 1px solid #e3e3e3;
          color: #e3e3e3;
        }
        .left input:focus, .left input:active {
          border-color: #03A9F4;
          color: #03A9F4;
        }
        .left input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 30px #2C3034 inset;
          -webkit-text-fill-color: #e3e3e3;
        }
        .left a {
          color: #03A9F4;
        }

        .right {
          width: 50%;
          height: 100%;
          overflow: scroll;
          background: #f9f9f9;
          right: 0;
          position: absolute;
        }
        .right label {
          color: #212121;
        }
        .right input {
          border-bottom: 1px solid #212121;
        }
        .right input:focus, .right input:active {
          border-color: #673AB7;
        }
        .right input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 30px #f9f9f9 inset;
          -webkit-text-fill-color: #212121;
        }

        .content {
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-height: 100%;
          width: 80%;
          margin: 0 auto;
          position: relative;
        }

        .content h2 {
          font-weight: 300;
          font-size: 2.6em;
          margin: 0.2em 0 0.1em;
        }

        .left .content h2 {
          color: #03A9F4;
        }

        .right .content h2 {
          color: #673AB7;
        }

        .form-element {
          margin: 1.6em 0;
        }
        .form-element.form-submit {
          margin: 1.6em 0 0;
        }

        .form-stack {
          display: flex;
          flex-direction: column;
        }

        .checkbox {
          -webkit-appearance: none;
          outline: none;
          background-color: #e3e3e3;
          border: 1px solid #e3e3e3;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05);
          padding: 12px;
          border-radius: 4px;
          display: inline-block;
          position: relative;
        }

        .checkbox:focus, .checkbox:checked:focus,
        .checkbox:active, .checkbox:checked:active {
          border-color: #03A9F4;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), inset 0px 1px 3px rgba(0, 0, 0, 0.1);
        }

        .checkbox:checked {
          outline: none;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05), inset 15px 10px -12px rgba(255, 255, 255, 0.1);
        }

        .checkbox:checked:after {
          outline: none;
          content: "✓";
          color: #03A9F4;
          font-size: 1.4em;
          font-weight: 900;
          position: absolute;
          top: -4px;
          left: 4px;
        }

        .form-checkbox {
          display: flex;
          align-items: center;
        }
        .form-checkbox label {
          margin: 0 6px 0;
          font-size: 0.72em;
        }

        button {
          padding: 0.8em 1.2em;
          margin: 0 10px 0 0;
          width: auto;
          font-weight: 600;
          text-transform: uppercase;
          font-size: 1em;
          color: #fff;
          line-height: 1em;
          letter-spacing: 0.6px;
          border-radius: 3px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.1);
          border: 0;
          outline: 0;
          transition: all 0.25s;
        }
        button.signup {
          background: #03A9F4;
        }
        button.login {
          background: #673AB7;
        }
        button.off {
          background: none;
          box-shadow: none;
          margin: 0;
        }
        button.off.signup {
          color: #03A9F4;
        }
        button.off.login {
          color: #673AB7;
        }

        button:focus, button:active, button:hover {
          box-shadow: 0 4px 7px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.1);
        }
        button:focus.signup, button:active.signup, button:hover.signup {
          background: #0288D1;
        }
        button:focus.login, button:active.login, button:hover.login {
          background: #512DA8;
        }
        button:focus.off, button:active.off, button:hover.off {
          box-shadow: none;
        }
        button:focus.off.signup, button:active.off.signup, button:hover.off.signup {
          color: #03A9F4;
          background: #212121;
        }
        button:focus.off.login, button:active.off.login, button:hover.off.login {
          color: #512DA8;
          background: #e3e3e3;
        }

        @media only screen and (max-width: 768px) {
          #slideBox {
            width: 80%;
            margin-left: 20%;
          }

          .signup-info, .login-info {
            display: none;
          }
        }
      `}</style>

      <div id="back">
        <div className="animated-shapes">
          <div className="shape shape1"></div>
          <div className="shape shape2"></div>
          <div className="shape shape3"></div>
          <div className="shape shape4"></div>
          <div className="shape shape5"></div>
          <div className="shape shape6"></div>
          <div className="shape shape7"></div>
          <div className="shape shape8"></div>
          <div className="shape shape9"></div>
          <div className="shape shape10"></div>
          <div className="shape shape11"></div>
          <div className="shape shape12"></div>
          <div className="shape shape13"></div>
          <div className="shape shape14"></div>
          <div className="shape shape15"></div>
          <div className="shape shape16"></div>
          <div className="shape shape17"></div>
          <div className="shape shape18"></div>
          <div className="shape shape19"></div>
          <div className="shape shape20"></div>
          <div className="shape shape21"></div>
          <div className="shape shape22"></div>
          <div className="shape shape23"></div>
          <div className="shape shape24"></div>
          <div className="shape shape25"></div>
          <div className="shape shape26"></div>
          <div className="shape shape27"></div>
          <div className="shape shape28"></div>
          <div className="shape shape29"></div>
          <div className="shape shape30"></div>
          <div className="shape shape31"></div>
          <div className="shape shape32"></div>
          <div className="shape shape33"></div>
          <div className="shape shape34"></div>
          <div className="shape shape35"></div>
          <div className="shape shape36"></div>
          <div className="shape shape37"></div>
          <div className="shape shape38"></div>
          <div className="shape shape39"></div>
          <div className="shape shape40"></div>
          <div className="shape shape41"></div>
          <div className="shape shape42"></div>
          <div className="shape shape43"></div>
          <div className="shape shape44"></div>
          <div className="shape shape45"></div>
          <div className="shape shape46"></div>
          <div className="shape shape47"></div>
          <div className="shape shape48"></div>
          <div className="shape shape49"></div>
          <div className="shape shape50"></div>
          <div className="shape shape51"></div>
          <div className="shape shape52"></div>
          <div className="shape shape53"></div>
          <div className="shape shape54"></div>
          <div className="shape shape55"></div>
          <div className="shape shape56"></div>
          <div className="shape shape57"></div>
          <div className="shape shape58"></div>
          <div className="shape shape59"></div>
          <div className="shape shape60"></div>
          <div className="shape shape61"></div>
          <div className="shape shape62"></div>
          <div className="shape shape63"></div>
          <div className="shape shape64"></div>
          <div className="shape shape65"></div>
          <div className="shape shape66"></div>
          <div className="shape shape67"></div>
          <div className="shape shape68"></div>
          <div className="shape shape69"></div>
          <div className="shape shape70"></div>
        </div>
        <div className="backRight"></div>
        <div className="backLeft"></div>
      </div>

      <div id="slideBox" ref={slideBoxRef}>
        <div className="topLayer" ref={topLayerRef}>
          <div style={{ scrollbarWidth: 'none' }} className="left">
            <div className="content">
              <form onSubmit={handleSignup}>
                <div className="form-element form-stack">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                  />
                </div>
                <div className="form-element form-stack">
                  <label htmlFor="username-signup" className="form-label">Username</label>
                  <input
                    id="username-signup"
                    type="text"
                    name="username"
                    value={signupUsername}
                    onChange={(e) => setSignupUsername(e.target.value)}
                  />
                </div>
                <div className="form-element form-stack">
                  <label htmlFor="password-signup" className="form-label">Password</label>
                  <input
                    id="password-signup"
                    type="password"
                    name="password"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                  />
                </div>
                <div className="form-element form-checkbox">
                  <input
                    id="confirm-terms"
                    type="checkbox"
                    name="confirm"
                    value="yes"
                    className="checkbox"
                    checked={confirmTerms}
                    onChange={(e) => setConfirmTerms(e.target.checked)}
                  />
                  <label htmlFor="confirm-terms">I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></label>
                </div>
                <div className="form-element form-submit">
                  <button id="goLeft" className="signup off" type="button" onClick={slideToLogin}>Log In</button>
                </div>
              </form>
            </div>
          </div>

          <div style={{ scrollbarWidth: 'none' }} className="right">
            <div className="content">
              <h2>Login</h2>
              <form onSubmit={handleLogin}>
                <div className="form-element form-stack">
                  <label htmlFor="username-login" className="form-label">Username</label>
                  <input
                    id="username-login"
                    type="text"
                    name="username"
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                  />
                </div>
                <div className="form-element form-stack">
                  <label htmlFor="password-login" className="form-label">Password</label>
                  <input
                    id="password-login"
                    type="password"
                    name="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                <div className="form-element form-submit">
                  <button id="logIn" className="login" type="submit" name="login" disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Log In'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
