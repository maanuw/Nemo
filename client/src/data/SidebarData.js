import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
{
    title: 'Dashbooad',
    path: '/dashboard/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
},
{
    title: 'Profile',
    path: '/profile/',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
},
{
    title: 'Team',
    path: '/view-reviews',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text'
},
{
    title: 'Review',
    path: '/reviews',
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'nav-text'
}
]