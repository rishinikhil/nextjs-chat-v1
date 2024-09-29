// Commenting original code 
// import React from 'react'

// import { cn } from '@/lib/utils'
// import { ExternalLink } from '@/components/external-link'

// export function FooterText({ className, ...props }: React.ComponentProps<'p'>) {
//   return (
//     <p
//       className={cn(
//         'px-2 text-center text-xs leading-normal text-muted-foreground',
//         className
//       )}
//       {...props}
//     >
//       BioSarthi AI built with{' '}
//       <ExternalLink href="https://nextjs.org">Next.js</ExternalLink> and{' '}
//       <ExternalLink href="https://github.com/vercel/ai">
//         Vercel AI SDK
//       </ExternalLink>
//       .
//     </p>
//   )
// }

import React from 'react';
import { cn } from '@/lib/utils';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';

export function FooterText({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      className={cn(
        'px-2 text-center text-xs leading-normal text-muted-foreground',
        className
      )}
      {...props}
    >
      BioSarthi<sup>®</sup> AI Engine <span className="font-bold">Beta</span> | &copy; 2024 CGF BioEnergy Pvt. Ltd. | All Rights Reserved |{' '}
      <Dialog>
        <DialogTrigger asChild>
          <button className="text-blue-500 hover:underline">
            Disclaimer
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Terms of Use & Disclaimer</DialogTitle>
          <DialogDescription className="space-y-4 text-justify">
            <p>BioSarthi<sup>®</sup> AI Engine, developed by CGF BioEnergy Pvt. Ltd., is provided for informational purposes only. By using this service, you agree to these Terms of Use and Disclaimer.</p>
            <p>CGF BioEnergy Pvt. Ltd. is not liable for any decisions or actions taken based on AI-generated responses. The company does not guarantee the accuracy or completeness of the information provided. The information shared should not be considered as professional advice. Please consult a professional for technical, financial, or legal matters.</p>
            <p>All trademarks, logos, and content are the intellectual property of CGF BioEnergy Pvt. Ltd. We reserve the right to modify these terms at any time without prior notice. By using BioSarthi<sup>®</sup> AI Engine, you consent to these terms and agree to the disclaimers mentioned above.</p>
            <p>For any questions or concerns, please contact us at hello[at]biosarthi.com.</p>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </p>
  );
}
