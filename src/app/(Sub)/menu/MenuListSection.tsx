'use client';

import Link from 'next/link';

import LogoutModal from '@/components/Login/LogoutModal';
import { useOverlay } from '@/components/Overlay/useOverlay';
import { menuList } from '@/constants/data';
import useUserState from '@/context/userState';
import useLaunchApp from '@/hooks/useLaunchApp';

export default function MenuListSection() {
  const { isLogin } = useUserState();
  const { open } = useOverlay();
  const { launchApp } = useLaunchApp();

  function handleLogout() {
    open(({ exit }) => <LogoutModal exit={exit} />);
  }

  return (
    <section className="flex flex-col">
      {menuList.map((item, idx) =>
        item.text ? (
          <div
            key={idx}
            className={`cursor-pointer py-12 ${'highlight' in item && 'text-main-violet'}`}
            onClick={() => launchApp(item.link, item?.deepLink)}
          >
            <span id="subtitle-1">{item.text}</span>
          </div>
        ) : (
          <div key={idx} className="py-12" />
        )
      )}
      {isLogin && (
        <>
          <div className="cursor-pointer py-12" onClick={handleLogout}>
            <span id="subtitle-1">로그아웃</span>
          </div>
          <Link href={'/menu/withdraw'} className="cursor-pointer py-12">
            <span id="subtitle-1" className="text-tertiary">
              탈퇴하기
            </span>
          </Link>
        </>
      )}
    </section>
  );
}
