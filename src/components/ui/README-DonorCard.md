# DonorCard Component

A clean, reusable UI component for generating and exporting donor identification cards as images.

## Features

- ✅ **Beautiful Design**: Professional gradient card with Arabic branding
- ✅ **User Avatar**: Displays donor's profile picture or fallback icon
- ✅ **QR Code**: Real QR code generation using the `qrcode` library
- ✅ **Export Function**: High-quality PNG export using `html2canvas`
- ✅ **Responsive**: Works on all screen sizes
- ✅ **RTL Support**: Full Arabic language support
- ✅ **Type Safe**: Full TypeScript support

## Dependencies

```bash
bun add html2canvas qrcode @types/qrcode
```

## Usage

### Basic Usage

```tsx
import { DonorCard } from "@/components/ui/donor-card";

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>عرض بطاقة المتبرع</Button>

      <DonorCard
        userId="user123"
        userName="أحمد محمد"
        userAvatar="/path/to/avatar.jpg"
        isOpen={isOpen}
        onOpenChange={setIsOpen}
      />
    </>
  );
}
```

### In Observer User Detail Page

```tsx
// Only show for donors
{
  user.userType === "donor" && (
    <Button
      onClick={() => setDonorCardOpen(true)}
      variant="outline"
      size="sm"
      className="flex items-center gap-2 border-red-200 text-red-600 hover:bg-red-50"
    >
      <CreditCard className="h-4 w-4" />
      بطاقة المتبرع
    </Button>
  );
}

<DonorCard
  userId={user.id}
  userName={user.name}
  userAvatar={user.avatar || undefined}
  isOpen={donorCardOpen}
  onOpenChange={setDonorCardOpen}
/>;
```

## Props

| Prop           | Type                      | Description                        |
| -------------- | ------------------------- | ---------------------------------- |
| `userId`       | `string`                  | Unique user identifier for QR code |
| `userName`     | `string`                  | Display name on the card           |
| `userAvatar`   | `string?`                 | URL to user's avatar image         |
| `isOpen`       | `boolean`                 | Dialog open state                  |
| `onOpenChange` | `(open: boolean) => void` | Callback for dialog state changes  |

## Card Design

The donor card includes:

1. **Header**: "بطاقة متبرع" badge with heart icon
2. **Avatar**: User's profile picture or default icon
3. **Name**: User's full name
4. **QR Code**: Generated QR code containing the user ID
5. **Footer**: Ehiaaa branding and platform description

## Export Features

- **High Quality**: 3x scale for sharp images
- **PNG Format**: Best compatibility and quality
- **Automatic Download**: Browser download with filename
- **Error Handling**: User-friendly error messages
- **Loading States**: Progress indicators during export

## Styling

- **Colors**: Red gradient background representing blood donation
- **Typography**: Cairo font family for Arabic text
- **Animations**: Subtle loading animations and hover effects
- **Dark Mode**: Full dark mode support

## Integration Points

### Observer Users List

- Quick access button for each donor in the list
- Tooltip explaining the functionality

### Observer User Detail Page

- Dedicated button in the actions section
- Only visible for users with type "donor"

## File Structure

```
src/components/ui/
├── donor-card.tsx          # Main component
└── README-DonorCard.md     # This documentation

src/components/observer/users/
├── ObserverUserDetail.tsx  # Integration point
└── ObserverUsersList.tsx   # Integration point
```

## Development Notes

- Uses dynamic imports for `html2canvas` to avoid SSR issues
- QR code generation is async with loading states
- Error boundaries handle edge cases
- Optimized for performance with proper state management

## Browser Compatibility

- Modern browsers supporting ES2020+
- Canvas API for image generation
- File download API for export functionality
